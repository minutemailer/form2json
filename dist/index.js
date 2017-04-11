'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = form2json;
function extractFieldNames(name) {
    var expression = /([^\]\[]+)/g;
    var elements = [];

    while (searchResult = expression.exec(name)) {
        elements.push(searchResult[0]);
    }

    return elements;
}

function attachData(target, names, value) {
    var currentTarget = target;
    var lastIndex = names.length - 1;

    names.forEach(function (name, i) {
        if (currentTarget[name] === undefined) {
            currentTarget[name] = i === lastIndex ? value : {};
        }

        currentTarget = currentTarget[name];
    });
}

function form2json(form) {
    var obj = {};
    var formElements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)');

    [].forEach.call(formElements, function (element) {
        var name = element.name;
        var type = element.type;
        var value = element.value;

        if (!name) {
            return;
        }

        if (['file', 'reset', 'submit', 'button'].indexOf(type) > -1) {
            return;
        }

        if (['checkbox', 'radio'].indexOf(type) > -1 && !element.checked) {
            return;
        }

        var names = extractFieldNames(name);

        attachData(obj, names, value);
    });

    return obj;
}