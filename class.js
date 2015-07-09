/**
 * Created by vitaliy on 21.04.15.
 */
function insertAfter(parent, node, referenceNode) {
    parent.insertBefore(node, referenceNode.nextSibling);
}
function HtmlConstructor(area){
    this.area = area;
    this.div = document.createElement('div');
    this.div.id = "new_html_block";
    this.add_url='/add_brief_blocks';
    this.section_id = document.getElementById('brief_block_id').value;

    this.AjaxRequest = function(params, id){

        this.update_url='/update_brief_blocks_fields/'+id ;

        var XHR=window.XDomainRequest||window.XMLHttpRequest;
        var xhr=new XHR();
        xhr.open('POST',this.update_url,true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload=function(){this.response=null;};
        xhr.onerror=function(){this.response="Error";};
        xhr.send(params);
    }
}
HtmlConstructor.prototype = {
    getId: function(){
        var blocks = document.getElementsByClassName('html_block');
        var id = 0;
        for(var i = 0; i < blocks.length; i++){
            var dataset = blocks[i].dataset;
            if(id < parseFloat(dataset.id)){
                id = parseFloat(dataset.id);
            }
        }

        var XHR=window.XDomainRequest||window.XMLHttpRequest;
        var xhr=new XHR();
        xhr.open('POST',this.add_url,false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send('id='+(id+1)+'&section_id='+ this.section_id);

        var type = xhr.getResponseHeader("Content-Type");
        return xhr.responseText;

    },
    createNewElement: function(data){
        if(data) {
            this.step = data.next_step;
            this.params = data;
        } else {
            this.step = 'step-1';
        }

        switch (this.step) {
            case 'step-1':
                this.createStepOne();
                break;
            case 'step-2':
                this.createStepTwo();
                break;
            case 'step-3':
                this.createStepThree();
                break;
            default:
                this.createStepOne();
        }

    },

    createStepOne: function(){

        var submit_button = '<input type="submit" class=" btn btn-success" name="Добавить">';
        var label_input = '<input type="text"  value="" name="label_name">';
        var required_input = '<input type="checkbox"  value="1" name="required">';
        var cancel_button = '<a id="cancel" class="btn btn-warning" href="#">Отмена</a>';

        var hidden_input = '<input type="hidden" id="step_input" value="step-2" name="next_step">';
        var type_selector =
            '<select id="select_type" name="block_type">'+
            '<option>Выберите тип поля</option>'+
            '<option value="text">input[text]</option>'+
            '<option value="radio">input[radio]</option>'+
            '<option value="checkbox">input[checkbox]</option>'+
            '<option value="textarea">textarea</option>'+
            '<option value="select" >select</option>'+
            '</select>';
        var block =
            '<label> Название '+label_input+'</label>'+
            '<label> Обязательный '+required_input+'</label>'+
            '<label> Тип '+type_selector+'</label>'+
            submit_button+cancel_button+
            hidden_input;
        this.div.innerHTML = block;
        this.area.appendChild(this.div);
        var cancel = document.getElementById('cancel');
        cancel.onclick = function(e){
            e.preventDefault();
            document.getElementById('new_html_block').remove();
            var button =  document.getElementById('addField');
            button.style.display = 'block';
        }
    },

    createStepTwo: function(){

        var inputData = this.selectType(this.params);

        this.textarea = document.createElement('textarea');
        this.textarea.placeholder ='Введитекод элемента';
        this.textarea.innerHTML =inputData;
        this.textarea.name = 'block_html';
        var targetNode = document.getElementById('select_type');
        var stepInput = document.getElementById('step_input');
        stepInput.value = 'step-3';
        insertAfter( targetNode.parentNode, this.textarea, targetNode);
        document.getElementById('select_type').disabled="disabled";

    },

    createStepThree: function(){
        var id = this.getId();
        var section_id = document.getElementById('brief_block_id').value;
        this.new_div = document.createElement('div');
        this.new_div.dataset.id = id;
        this.new_div.id = this.new_div.dataset.id;
        this.new_div.innerHTML = this.params.block_html;

        console.log(this.params);

        this.ajaxData = [];
        this.ajaxData.html = this.new_div.outerHTML;
        this.ajaxData.section_id = section_id;
        this.ajaxData.type = this.params.block_type;
        this.ajaxData.required = this.params.required;
        this.ajaxData.block_id = this.new_div.dataset.id;
        this.id = this.getId();
        this.AjaxRequest(this.getParams().send_data, this.id);


        this.final_div = document.createElement('div');
        this.final_div.dataset.id = id;
        this.final_div.className = 'field_row html_block';
        var innerHtmlText = this.new_div.outerHTML +
            '<p class="delete_field btn btn-danger">Удалить поле</p>'+
            '<p class="update_field btn btn-primary" >Редактировать</p>';
        this.final_div.innerHTML = innerHtmlText;



        var oldBlock = document.getElementById('new_html_block');
        this.area.replaceChild(this.final_div, oldBlock);
        var button =  document.getElementById('addField');
        button.style.display = 'block';
    },



    getParams: function(){
        for(p in  this.ajaxData){
            if( this.ajaxData[p]!==null&&typeof( this.ajaxData[p])!=='function'){
                this.send_data=this.getCorrectParams()+p+'='+ this.ajaxData[p];
            }
        }
        return this;
    },

    getCorrectParams: function(){
        if(this.send_data !== null){
            return this.send_data+'&';
        } else {
            return '';
        }
    },

    selectType: function(data){
        var id = this.getId();
        var required = data.required ? 'data-required="1"': 'data-required="0"';
        switch (data.block_type) {
            case 'text':
                return '<label>'+data.label_name+'<input '+ required +' type="text" name="'+id+'" value=""></label>';
                break;
            case 'radio':

                return '<label>'+data.label_name+'<input '+ required +'  type="radio" name="'+id+'" value=""></label>';
                break;
            case 'checkbox':
                return '<label>'+data.label_name+'<input '+ required +' type="checkbox" name="'+id+'" value=""></label>';
                break;
            case 'select':
                return '<label>'+data.label_name+
                    '<select '+ required +'  name="'+id+'">'+
                    '<option></option>'+
                    '</select>'+
                    '</label>';
                break;
            case 'textarea':
                return  '<label>'+data.label_name+
                    '<textarea '+ required +' name="'+id+'"></textarea>'+
                    '</label>';

                break;

        }

    },

    deleteRow: function(row){
        var parent = row.parentNode;
        var url = '/delete_brief_blocks/'+parent.dataset.id;

        var XHR=window.XDomainRequest||window.XMLHttpRequest;
        var xhr=new XHR();
        xhr.open('POST',url,false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
        var type = xhr.getResponseHeader("Content-Type");
        parent.remove();
        return xhr.responseText;

    },

    updateRow: function(row){
        var parent = row.parentElement;
        var upadate_block = parent.getElementsByTagName('div')[0];

        var textarea = document.createElement('textarea');
        textarea.innerHTML = upadate_block.innerHTML;

        var old_update_button = parent.getElementsByClassName('update_field')[0];
        var old_delete_button = parent.getElementsByClassName('delete_field')[0];


        var save_button = document.createElement('a');
        save_button.href = '#';
        save_button.className = 'save_change btn btn-success';
        save_button.innerHTML = 'Сохранить';
        var sendAjax = this.AjaxRequest;
        save_button.onclick = function(e){
            e.preventDefault();
            upadate_block.innerHTML = textarea.value;
            parent.replaceChild(upadate_block, textarea );
            parent.replaceChild(old_update_button , cancel_button  );
            parent.replaceChild(old_delete_button, save_button );
            var id = upadate_block.dataset.id;
            var test = upadate_block.outerHTML;
            var parameters = 'html='+test;
            sendAjax(parameters, id);
        };


        var cancel_button = document.createElement('a');
        cancel_button.href = '#';
        cancel_button.className = 'cancel_change btn btn-primary';
        cancel_button.innerHTML = 'Отмена';
        cancel_button.onclick = function(e){
            e.preventDefault();
            parent.replaceChild(upadate_block, textarea );
            parent.replaceChild(old_update_button , cancel_button  );
            parent.replaceChild(old_delete_button, save_button );
        };

        parent.replaceChild(textarea,  upadate_block );
        parent.replaceChild(cancel_button,  old_update_button );
        parent.replaceChild(save_button,  old_delete_button );
    }

};