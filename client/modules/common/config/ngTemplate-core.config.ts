/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace common.config {
    /**
     * Configuration for the shared module.
     */
    commonModule.config(
        /* @ngInject */
        (ngTemplateCoreProvider: ngTemplate.core.config.CoreConfig) => {
            // ngTemplateCoreProvider.config.forms.errorCondition = '{control-name}.$invalid && ({control-name}.$touched || {form-name}.$submitted)';
//             ngTemplateCoreProvider.config.dropdownWidgets.singleSelectBuilder = (attrs: shared.widgets.IDropdownWidgetAttributes): JQuery => {
//                 let uiSelect: JQuery = $('<ui-select></ui-select>');
//
//                 let valueProperty: string = attrs.value || 'value';
//                 let displayTextProperty: string = attrs.displayText || 'displayText';
//
//                 let uiSelectMatch: JQuery = $('<ui-select-match></ui-select-match>');
//                 if (Boolean(attrs['placeholder'])) {
//                     uiSelectMatch.attr('placeholder', attrs['placeholder']);
//                 }
//                 if (attrs.allowBlank) {
//                     uiSelectMatch.attr('allow-clear', 'true');
//                 }
//                 uiSelectMatch.text(`{{$select.selected.${displayTextProperty}}}`);
//
//                 let uiSelectChoices: JQuery = $('<ui-select-choices></ui-select-choices>');
//                 uiSelectChoices.attr('repeat', `x.${valueProperty} as x in ${attrs.items} | filter: { ${displayTextProperty}: $select.search }`);
//
//                 let span: JQuery = $('<span></span>');
//                 span.attr('ng-bind-html', `x.${displayTextProperty} | highlight: $select.search`);
//
//                 uiSelectChoices.append(span);
//                 uiSelect.append(uiSelectMatch);
//                 uiSelect.append(uiSelectChoices);
//                 return uiSelect;
//             };
        }
    );
}
