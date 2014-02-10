(function(global) {
    'use strict';

    var priceToDisplayMap = {
        all: {
            tmv_invoice_msrp:   'Invoice, TMV amd MSRP',
            tmv_invoice:        'Invoice and TMV',
            tmv:                'TMV only'
        },
        new: {
            tmv_invoice_msrp:   'Invoice, TMV amd MSRP',
            tmv_invoice:        'Invoice and TMV',
            tmv:                'TMV only'
        },
        used: {
            tmv_invoice_msrp:   'TradeIn, PrivateParty and Dealer Retail',
            tmv_invoice:        'TradeIn and Dealer Retail',
            tmv:                'Dealer Retail only'
        }
    };

    var widthSliderOptionsMap = {
        vertical: {
            min:    250,
            max:    468,
            value:  250
        },
        horizontal: {
            min:    600,
            max:    970,
            value:  680
        }
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

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

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

    var TMVConfigurator = Backbone.View.extend({

        defaults: {
            publicationState: 'all',
            includeBorder: true,
            layout: 'vertical'
        },

        events: {
            'submit': 'onSubmit',
            'reset': 'onReset',
            'change [name="theme"], [name="colorScheme"]': 'updateStyles',
            'change [name="publicationState"]': 'onPublicationStateChange',
            'change [name="layout"]': 'onLayoutChange',
            'change #include_border': 'onIncludeBorderChange',

            'change .list-group-makes [type="checkbox"]': 'onSelectMake',
            'change #toggleAllMakes': 'onToggleAllMakes',
            'change [name="priceToDisplay"]': 'onPriceToDisplayChange',

            'valid #vehicle-api-key-control': 'onVehicleApiKeyChange',
            'valid #zip-code-control': 'onZipCodeChange'
        },

        $widgetPlaceholder: $('#tmvwidget'),

        vehicleApiKey: '',

        initialize: function() {
            // cache elements
            this.$priceToDisplay = this.$('[name="priceToDisplay"]');
            this.$width = this.$('[name="width"]');
            this.$borderWidth = this.$('[name="borderWidth"]');
            this.$borderRadius = this.$('[name="borderRadius"]');
            this.$includedMakes = this.$('[name="includedMakes"]');
            this.$widthSlider = this.$('#width_slider');
            this.$borderRadiusSlider = this.$('#border_radius_slider');
            this.$makesList = this.$('.list-group-makes');
            this.$toggleAllMakes = this.$('#toggleAllMakes');
            // vehicle api key control
            this.vehicleApiControl = this.$('#vehicle-api-key-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid Vehicle API key',
                validate: vehicleApiKeyValidator
            }).data('inputGroupControl');
            // zip code control
            this.zipCodeControl = this.$('#zip-code-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid ZIP code',
                disabled: true,
                validate: zipCodeValidator
            }).data('inputGroupControl');
            this.zipCodeControl.disable();
            // price to display
            this.renderPriceToDisplay();
            // create sliders
            this.widthSlider = this.createSlider(this.$widthSlider, widthSliderOptionsMap[this.defaults.layout], _.bind(this.onWidthChange, this));
            this.borderRadiusSlider = this.createSlider(this.$borderRadiusSlider, borderRadiusSliderOptions, _.bind(this.onBorderRadiusChange, this));
            // instructions
            this.$instructions = $('#instructions_dialog').modal({
                backdrop: 'static',
                keyboard: false,
                show: false
            });
            // optimize
            this.updateStyles = _.debounce(this.updateStyles, 500);
            this.renderWidget = _.debounce(this.renderWidget, 500);
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
            var publicationState = this.toJSON().publicationState;
            if (!this.vehicleApiKey) {
                return;
            }
            this.resetMakes();
            this.$makesList.html('<div class="loading">Loading makes...</div>');
            if (publicationState === 'all') {
                publicationState = 'new,used';
            }
            jQuery.ajax({
                url: 'http://api.edmunds.com/api/vehicle/v2/makes',
                data: {
                    api_key: this.vehicleApiKey,
                    state: publicationState
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
            if (!this.zipCode) {
                this.zipCodeControl.$input.tooltip('show');
                isValid = false;
            }
            if (isValid) {
                this.$instructions.find('#insert_js').html(this.getJavaScriptSnippet());
                this.$instructions.find('#insert_css').html(this.getStylesSnippet());
                this.$instructions.modal('show');
            }
        },

        onReset: function() {
            this.resetMakes();
            this.$borderWidth.val('1px');
            //
            this.zipCode = null;
            this.zipCodeControl.reset();
            // reset button groups
            this.$('.btn-group .btn:first-child').trigger('click');
            // reset sliders
            this.widthSlider.option(widthSliderOptionsMap[this.defaults.layout]);
            this.borderRadiusSlider.option(borderRadiusSliderOptions);
            // find makes
            if (this.vehicleApiKey) {
                this.findMakes();
                this.zipCodeControl.enable();
            }
            // render widget
            this.renderWidget();
        },

        onVehicleApiKeyChange: function(event, apiKey) {
            this.vehicleApiKey = apiKey;
            this.zipCodeControl.enable();
            this.zipCodeControl.options.apiKey = apiKey;
            this.findMakes();
            this.renderWidget();
        },

        onPriceToDisplayChange: function() {
            this.renderWidget();
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

        onPublicationStateChange: function(event) {
            var publicationState = event.target.value;
            this.renderPriceToDisplay(publicationState);
            this.findMakes();
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
            this.updateStyles();
        },

        renderPriceToDisplay: function(publicationState) {
            publicationState = publicationState || this.defaults.publicationState;
            this.$priceToDisplay.empty();
            _.each(priceToDisplayMap[publicationState], function(text, value) {
                this.$priceToDisplay.append('<option value="' + value + '">' + text + '</option>');
            }, this);
            return this;
        },

        renderMakesList: function(makes) {
            this.$makesList.empty();
            _.each(makes, function(make) {
                this.$makesList.append(makesListItemTemplate(make));
            }, this);
            this.$toggleAllMakes.prop('disabled', false);
            return this;
        },

        renderWidget: function() {
            var options = this.toJSON(),
                widget;
            this.$widgetPlaceholder.empty();
            widget = this.widget = new EDM.TMV(this.vehicleApiKey, {
                root:       'tmvwidget',
                baseClass:  'tmvwidget'
            });
            widget.init({
                showVehicles:   options.publicationState.toUpperCase(),
                includedMakes:  options.includedMakes,
                zip:            options.zipCode,
                price:          options.priceToDisplay
            });
            widget.render();
            return this;
        },

        updateStyles: function() {
            var primaryStyles = this.primaryStyles,
                secondaryStyles = this.secondaryStyles,
                options = this.toJSON(),
                primaryUrl;
            if (!primaryStyles) {
                primaryStyles = document.createElement('link');
                primaryStyles.setAttribute('rel', 'stylesheet');
                document.getElementsByTagName('head')[0].appendChild(primaryStyles);
                this.primaryStyles = primaryStyles;
            }
            if (!secondaryStyles) {
                secondaryStyles = document.createElement('style');
                secondaryStyles.setAttribute('type', 'text/css');
                document.getElementsByTagName('head')[0].appendChild(secondaryStyles);
                this.secondaryStyles = secondaryStyles;
            }
            primaryUrl = '/tmv/css/' + options.theme + '-' + options.colorScheme + '.css';
            primaryStyles.setAttribute('href', primaryUrl);
            // load additional styles
            jQuery.ajax({
                url: '/tmv/api/less',
                data: {
                    options: {
                        theme: options.theme,
                        colorScheme: options.colorScheme,
                        layout: options.layout
                    },
                    variables: {
                        borderWidth: options.borderWidth,
                        borderRadius: options.borderRadius,
                        width: options.width
                    }
                },
                dataType: 'json',
                success: function(response) {
                    if (response.status !== 'success') {
                        return;
                    }
                    if (secondaryStyles.styleSheet) {
                        secondaryStyles.styleSheet.cssText = response.styles;
                    } else {
                        secondaryStyles.innerHTML = '';
                        secondaryStyles.appendChild(document.createTextNode(response.styles));
                    }
                }
            });
            return this;
        },

        reset: function() {
            this.el.reset();
            return this;
        },

        toJSON: function() {
            var options = {};
            _.each(this.$el.serializeArray(), function(option) {
                options[option.name] = option.value;
            });
            return options;
        },

        getJavaScriptSnippet: function() {
            var tpl = _.escape('<script type="text/javascript">' + $('#js_snippet_template').html() + '</script>'),
                options = this.toJSON(),
                widgetOptions = {
                    includedMakes:  options.includedMakes,
                    showVehicles:   options.publicationState,
                    zip:            options.zipCode,
                    price:          options.priceToDisplay
                };
            return _.template(tpl, {
                apiKey:     this.vehicleApiKey,
                sdkSrc:     location.origin + '/js/edmunds-sdk.min.js',
                widgetSrc:  location.origin + '/tmv/js/tmv.min.js',
                options:    JSON.stringify(widgetOptions)
            });
        },

        getStylesSnippet: function() {
            var tpl = _.escape([
                    '<link rel="stylesheet" href="{{ href }}">\n',
                    '<style type="text/css">\n{{ styles }}\n</style>'
                ].join(''));
            return _.template(tpl, {
                href:   this.primaryStyles.href,
                styles: $(this.secondaryStyles).text()
            });
        }

    });

    global.TMVConfigurator = TMVConfigurator;

}(this));
