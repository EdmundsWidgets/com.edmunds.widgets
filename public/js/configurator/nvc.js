(function(global) {
    'use strict';

    var widthSliderOptions = {
        min:    250,
        max:    970,
        value:  250
    };

    var borderRadiusSliderOptions = {
        min: 0,
        max: 20,
        value: 5
    };

    var makesListItemTemplate = _.template([
        '<label class="list-group-item checkbox">',
            '<input type="checkbox" value="<%= niceName %>"><%= name %>',
        '</label>'
    ].join(''));

    function zipCodeValidator(value) {
        var deferred = new jQuery.Deferred();
        if (!/^\d{5}$/.test(value)) {
            deferred.rejectWith(this, [value]);
            return deferred.promise();
        }
        jQuery.ajax({
            url: 'http://api.edmunds.com/v1/api/region/zip/validation/' + value,
            data: {
                api_key: this.options.apiKey
            },
            dataType: 'jsonp',
            context: this,
            success: function(response) {
                deferred[response[value] === 'true' ? 'resolveWith' : 'rejectWith'](this, [value]);
            },
            error: function() {
                deferred.rejectWith(this, [value]);
            }
        });
        return deferred.promise();
    }

    function vehicleApiKeyValidator(value) {
        var deferred = new jQuery.Deferred();
        if (!value) {
            deferred.rejectWith(this, [value]);
            return deferred.promise();
        }
        jQuery.ajax({
            url: '/api/keyvalidate',
            data: {
                api_key: value,
                service: 'vehicle'
            },
            dataType: 'json',
            context: this,
            success: function(response) {
                deferred[response.valid === true ? 'resolveWith' : 'rejectWith'](this, [value]);
            },
            error: function() {
                deferred.rejectWith(this, [value]);
            }
        });
        return deferred.promise();
    }

    function dealerApiKeyValidator(value) {
        var deferred = new jQuery.Deferred();
        if (!value) {
            deferred.rejectWith(this, [value]);
            return deferred.promise();
        }
        jQuery.ajax({
            url: '/api/keyvalidate',
            data: {
                api_key: value,
                service: 'dealer'
            },
            dataType: 'json',
            context: this,
            success: function(response) {
                deferred[response.valid === true ? 'resolveWith' : 'rejectWith'](this, [value]);
            },
            error: function() {
                deferred.rejectWith(this, [value]);
            }
        });
        return deferred.promise();
    }

    var NVCConfigurator = Backbone.View.extend({

        defaults: {
            includeBorder: true
        },

        events: {
            'submit': 'onSubmit',
            'reset': 'onReset',
            'change [name="theme"], [name="colorScheme"]': 'updateStyles',
            'change [name="layout"]': 'onLayoutChange',
            'change #include_border': 'onIncludeBorderChange',

            'change .list-group-makes [type="checkbox"]': 'onSelectMake',
            'change #toggleAllMakes': 'onToggleAllMakes',
            'change [name="tabsToDisplay"]': 'onTabsToDisplayChange',
            'click [data-action="applyTabName"]': 'renderWidget',

            'valid #vehicle-api-key-control': 'onVehicleApiKeyChange',
            'valid #dealer-api-key-control': 'onDealerApiKeyChange',
            'valid #zip-code-control': 'onZipCodeChange'
        },

        $widgetPlaceholder: $('#widget-placeholder'),

        initialize: function() {
            // cache elements
            this.$width = this.$('[name="width"]');
            this.$height = this.$('[name="height"]');
            this.$borderWidth = this.$('[name="borderWidth"]');
            this.$borderRadius = this.$('[name="borderRadius"]');
            this.$includedMakes = this.$('[name="includedMakes"]');
            this.$widthSlider = this.$('#width_slider');
            this.$borderRadiusSlider = this.$('#border_radius_slider');
            this.$makesList = this.$('.list-group-makes');
            this.$toggleAllMakes = this.$('#toggleAllMakes');
            this.$tabNameControl2 = this.$('#tab2_name').find('input, .btn');
            this.$tabNameControl3 = this.$('#tab3_name').find('input, .btn');
            // vehicle api key control
            this.vehicleApiControl = this.$('#vehicle-api-key-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid Vehicle API key',
                validate: vehicleApiKeyValidator
            }).data('inputGroupControl');
            // dealer api key control
            this.dealerApiControl = this.$('#dealer-api-key-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid Dealer API key',
                validate: dealerApiKeyValidator
            }).data('inputGroupControl');
            // zip code control
            this.zipCodeControl = this.$('#zip-code-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid ZIP code',
                disabled: true,
                validate: zipCodeValidator
            }).data('inputGroupControl');
            this.zipCodeControl.disable();
            // create sliders
            this.widthSlider = this.createSlider(this.$widthSlider, widthSliderOptions, _.bind(this.onWidthChange, this));
            this.borderRadiusSlider = this.createSlider(this.$borderRadiusSlider, borderRadiusSliderOptions, _.bind(this.onBorderRadiusChange, this));
            // optimize
            this.renderWidget = _.debounce(this.renderWidget, 500);
            this.updateStyles = _.debounce(this.updateStyles, 500);
            this.onReset = _.debounce(this.onReset, 500, true);
        },

        createSlider: function($el, options, onChange) {
            return $el.slider({
                range:  'min',
                value:  options.value,
                min:    options.min,
                max:    options.max,
                create: function(event, ui) {
                    $(this).find('.ui-slider-handle').tooltip({
                        animation: false,
                        title: options.value + 'px',
                        trigger: 'manual',
                        placement: 'bottom',
                        container: $el.find('.ui-slider-handle')
                    }).tooltip('show');
                },
                slide: function(event, ui) {
                    $(this)
                        .find('.ui-slider-handle .tooltip-inner')
                        .text(ui.value + 'px');
                },
                change: function(event, ui) {
                    $(this)
                        .find('.ui-slider-handle .tooltip-inner')
                        .text(ui.value + 'px');
                    if (_.isFunction(onChange)) {
                        onChange(ui.value);
                    }
                }
            }).data('ui-slider');
        },

        findMakes: function() {
            if (!this.vehicleApiKey) {
                return;
            }
            this.resetMakes();
            this.$makesList.html('<div class="loading">Loading makes...</div>');
            jQuery.ajax({
                url: 'http://api.edmunds.com/api/vehicle/v2/makes',
                data: {
                    api_key: this.vehicleApiKey,
                    state: 'new'
                },
                dataType: 'jsonp',
                context: this,
                success: function(response) {
                    this.renderMakesList(response.makes);
                },
                error: function() {}
            });
            return this;
        },

        resetMakes: function() {
            this.$makesList.empty();
            this.$includedMakes.val('');
            this.$toggleAllMakes.prop({
                disabled: true,
                checked: false
            });
            return this;
        },

        onSubmit: function(event) {
            var isValid = true;
            event.preventDefault();
            if (!this.vehicleApiKey) {
                this.vehicleApiControl.$input.tooltip('show');
                isValid = false;
            }
            if (!this.dealerApiKey) {
                this.dealerApiControl.$input.tooltip('show');
                isValid = false;
            }
            if (!this.zipCode) {
                this.zipCodeControl.$input.tooltip('show');
                isValid = false;
            }
            if (isValid) {
                // TODO show instructions
                console.log(this.toJSON());
            }
        },

        onReset: function() {
            this.resetMakes();
            this.$borderWidth.val('1px');
            //
            this.zipCodeControl.reset();
            // reset button groups
            this.$('.btn-group .btn:first-child').trigger('click');
            // reset fields tab names
            this.$tabNameControl2.prop('disabled', false);
            this.$tabNameControl3.prop('disabled', false);
            // reset sliders
            this.widthSlider.option(widthSliderOptions);
            this.borderRadiusSlider.option(borderRadiusSliderOptions);
            // find makes
            if (this.vehicleApiKey) {
                this.findMakes();
                this.zipCodeControl.enable();
            }
            // render widget
            this.widget = null;
            this.renderWidget();
        },

        onVehicleApiKeyChange: function(event, apiKey) {
            this.vehicleApiKey = apiKey;
            this.zipCodeControl.enable();
            this.zipCodeControl.options.apiKey = apiKey;
            this.findMakes();
            this.renderWidget();
        },

        onDealerApiKeyChange: function(event, apiKey) {
            this.dealerApiKey = apiKey;
            this.renderWidget();
        },

        onTabsToDisplayChange: function(event) {
            switch (event.target.value) {
                case '1':
                    this.$tabNameControl2.prop('disabled', false);
                    this.$tabNameControl3.prop('disabled', false);
                    break;
                case '2':
                    this.$tabNameControl2.prop('disabled', false);
                    this.$tabNameControl3.prop('disabled', true);
                    break;
                case '3':
                    this.$tabNameControl2.prop('disabled', true);
                    this.$tabNameControl3.prop('disabled', false);
                    break;
            }
            this.renderWidget();
        },

        getTabNames: function(options) {
            return {
                tab1: options.tab1Name,
                tab2: options.tab2Name || null,
                tab3: options.tab3Name || null
            };
        },

        onZipCodeChange: function(event, zipCode) {
            this.zipCode = zipCode;
            this.renderWidget();
        },

        onSelectMake: function(event) {
            var includedMakes = [];
            this.$makesList.find('[type="checkbox"]:checked').each(function() {
                includedMakes.push(this.value);
            });
            this.$includedMakes.val(includedMakes.join(','));
            this.renderWidget();
        },

        onToggleAllMakes: function(event) {
            var checked = event.target.checked;
            this.$includedMakes.val(checked ? 'all' : '');
            this.$makesList.find('[type="checkbox"]').prop('checked', checked);
            this.renderWidget();
        },

        onLayoutChange: function(event) {
            var layout = event.target.value;
            this.widthSlider.option(widthSliderOptionsMap[layout]);
            this.updateStyles();
        },

        onIncludeBorderChange: function(event) {
            this.$borderWidth.val(event.target.checked ? '1px' : '0');
            this.updateStyles();
        },

        onBorderRadiusChange: function(value) {
            this.$borderRadius.val(value + 'px');
            this.updateStyles();
        },

        onWidthChange: function(value) {
            this.$width.val(value + 'px');
            this.$height.val(this.getWidgetHeight(value) + 'px');
            this.renderWidget();
        },

        renderMakesList: function(makes) {
            this.$makesList.empty();
            makes.sort(function(a, b) {
                if (a.niceName > b.niceName) {
                    return 1;
                }
                if (a.niceName < b.niceName) {
                    return -1;
                }
                return 0;
            });
            _.each(makes, function(make) {
                this.$makesList.append(makesListItemTemplate(make));
            }, this);
            this.$toggleAllMakes.prop('disabled', false);
            return this;
        },

        renderWidget: function() {
            var options = this.toJSON();
            this.$widgetPlaceholder.find("#nvcwidget").remove();
            this.$widgetPlaceholder.prepend('<div id="nvcwidget"></div>');
            this.widget = EDM.createWidget({
                type:       'nvc',
                renderTo:   'nvcwidget',
                style: {
                    width:          options.width.replace('px', ''),
                    height:         options.height.replace('px', ''),
                    theme:          options.theme,
                    colorScheme:    options.colorScheme,
                    border:         options.borderWidth,
                    borderRadius:   options.borderRadius
                },
                options: {
                    vehicleApiKey:  this.vehicleApiKey || '',
                    dealerApiKey:   this.dealerApiKey || '',
                    includedMakes:  options.includedMakes,
                    zipCode:        this.zipCode,
                    dealerKeywords: '',
                    tabs: this.getTabNames(options)
                }
            });
            return this;
        },

        reset: function() {
            this.el.reset();
            return this;
        },

        updateStyles: function() {
            var lessApiUrl = '/nvc/api/less',
                widgetFrameWindow = window.frames[0] && window.frames[0].window,
                queryString = '?_=' + Date.now(),
                options = this.toJSON(),
                styleOptions = _.pick(options, ['theme', 'colorScheme']),
                variables = _.pick(options, ['width', 'height', 'borderWidth', 'borderRadius']);
            if (this.widget && widgetFrameWindow && widgetFrameWindow.jQuery) {
                // style options
                _.each(styleOptions, function(value, key) {
                    key = encodeURIComponent('style[' + key + ']');
                    value = encodeURIComponent(value);
                    queryString += '&' + key + '=' + value;
                });
                // variables
                _.each(variables, function(value, key) {
                    key = encodeURIComponent('variables[' + key + ']');
                    value = encodeURIComponent(value);
                    queryString += '&' + key + '=' + value;
                });
                widgetFrameWindow.jQuery('head link').attr('href', lessApiUrl + queryString);
            }
        },

        toJSON: function() {
            var options = {};
            _.each(this.$el.serializeArray(), function(option) {
                options[option.name] = option.value;
            });
            return options;
        },

        getWidgetHeight: function(width) {
            if (width < 485) {
                return 890;
            } else if (width >= 485 && width < 720) {
                return 635;
            } else if (width >= 720) {
                return 480;
            }
        }

    });

    global.NVCConfigurator = NVCConfigurator;

}(this));
