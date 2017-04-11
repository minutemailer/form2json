import form2json from '../src/index';

describe('Test form elements', function () {

    it('empty forms should return empty object', function () {
        let form = document.createElement('form');

        expect(JSON.stringify(form2json(form))).toEqual('{}');
    });

    it('fields without names should be ignored', function () {
        let form = document.createElement('form');
        let input = document.createElement('input');

        form.appendChild(input);

        expect(JSON.stringify(form2json(form))).toEqual('{}');
    });

    it('should save inputs and textareas', function () {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let textarea = document.createElement('textarea');

        input.name  = 'foo';
        input.value = 'bar';

        textarea.name  = 'bar';
        textarea.value = 'foo';

        form.appendChild(input);
        form.appendChild(textarea);

        expect(JSON.stringify(form2json(form))).toEqual(JSON.stringify({foo: 'bar', bar: 'foo'}));
    });

    it('should save radio buttons', function () {
        let form = document.createElement('form');
        let radio1 = document.createElement('input');
        let radio2 = document.createElement('input');

        radio1.name  = 'foo';
        radio1.type  = 'radio';
        radio1.value = 'bar';

        radio2.name  = 'foo';
        radio2.type  = 'radio';
        radio2.value = 'baz';
        radio2.checked = true;

        form.appendChild(radio1);
        form.appendChild(radio2);

        expect(JSON.stringify(form2json(form))).toEqual(JSON.stringify({foo: 'baz'}));
    });

    it('should save checkboxes', function () {
        let form = document.createElement('form');
        let checkbox1 = document.createElement('input');
        let checkbox2 = document.createElement('input');
        let checkbox3 = document.createElement('input');

        checkbox1.name  = 'foo';
        checkbox1.type  = 'checkbox';
        checkbox1.value = 'bar';
        checkbox1.checked = true;

        checkbox2.name  = 'foo';
        checkbox2.type  = 'checkbox';
        checkbox2.value = 'baz';
        checkbox2.checked = true;

        checkbox3.name  = 'foo';
        checkbox3.type  = 'checkbox';
        checkbox3.value = 'bah';

        form.appendChild(checkbox1);
        form.appendChild(checkbox2);
        form.appendChild(checkbox3);

        expect(JSON.stringify(form2json(form))).toEqual(JSON.stringify({foo: ['bar', 'baz']}));
    });

    it('should handle array input names', function () {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let textarea = document.createElement('textarea');

        input.name  = 'foo[1][foo]';
        input.value = 'bar';

        textarea.name  = 'foo[1][bar]';
        textarea.value = 'baz';

        form.appendChild(input);
        form.appendChild(textarea);

        expect(JSON.stringify(form2json(form))).toEqual(JSON.stringify({foo: {1: {foo: 'bar', bar: 'baz'}}}));
    });

    it('should save selectboxes', function () {
        let form = document.createElement('form');
        let select = document.createElement('select');
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');

        select.name = 'foo';

        option1.value = 'baz';
        option1.selected = true;

        option2.value = 'bar';

        select.appendChild(option2);
        select.appendChild(option1);

        form.appendChild(select);

        console.log(form2json(form));

        expect(JSON.stringify(form2json(form))).toEqual(JSON.stringify({foo: 'baz'}));
    });

    it('should ignore disabled fields', function () {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let textarea = document.createElement('textarea');

        input.name  = 'foo';
        input.value = 'bar';
        input.disabled = true;

        textarea.name  = 'bar';
        textarea.value = 'foo';

        form.appendChild(input);
        form.appendChild(textarea);

        expect(JSON.stringify(form2json(form))).toEqual(JSON.stringify({bar: 'foo'}));
    });

});