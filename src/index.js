function extractFieldNames(name) {
    const expression = /([^\]\[]+)/g;
    let elements = [];
    let searchResult;

    while((searchResult = expression.exec(name))) {
        elements.push(searchResult[0]);
    }

    return elements;
}

function attachData(target, names, value, type) {
    let currentTarget  = target;
    let lastIndex      = names.length - 1;

    names.forEach(function (name, i) {
        if (currentTarget[name] === undefined) {
            if (type === 'checkbox') {
                currentTarget[name] = (i === lastIndex) ? [value] : {};
            } else {
                currentTarget[name] = (i === lastIndex) ? value : {};
            }
        } else if (Object.prototype.toString.call(currentTarget[name]) === '[object Array]') {
            currentTarget[name].push(value);
        }

        currentTarget = currentTarget[name];
    });
}

export default function form2json(form) {
    let obj = {};
    let formElements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)');

    [].forEach.call(formElements, function (element) {
        let name  = element.name;
        let type  = element.type;
        let value = element.value;

        if (!name) {
            return;
        }

        if (['file', 'reset', 'submit', 'button'].indexOf(type) > -1) {
            return;
        }

        if (['checkbox', 'radio'].indexOf(type) > -1 && !element.checked) {
            return;
        }

        let names = extractFieldNames(name);

        attachData(obj, names, value, type);
    });

    return obj;
}