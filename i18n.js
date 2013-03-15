/*
Simple i18n v1.0
Copyright (C) 2013- Hunt Bao
Hunt Bao - gzooler@gmail.com

https://github.com/huntbao/i18n

------------------------------------------------------------------------------------------
Description 
------------------------------------------------------------------------------------------
    
Simple i18n for JavaScript(jQuery)
   
-------------------------------------------------------------------------------------------
License
-------------------------------------------------------------------------------------------
    
This program is free software: you can redistribute it and/or modify
it under the terms of the Lesser GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
    
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
Lesser GNU General Public License for more details.
    
You should have received a copy of the Lesser GNU General Public License
along with this program.  If not, see < http://www.gnu.org/licenses/ >.

*/
(function(){
    'use strict';
    var i18n = {
        _stringBundle: {},
        setStringBundle: function(stringBundle){
            this._stringBundle = stringBundle;
        },
        get: function(){
            if(typeof(arguments[1]) !== 'string'){
               return this.format(this.get(arguments[0]), arguments[1]);
            }
            var key = this._stringBundle[arguments[0]];
            return key ? key.message : arguments[0];
        },
        getMessage: function(){
           return this.get.apply(this, arguments);
        },
        getMessages: function(keyArr){
            var messages = [];
            for(var i = 0, l = keyArr.length; i < l; i++){
                messages.push(this.get(keyArr[i]));
            }
            return messages;
        },
        format: function(str, arr){
            var strArr = str.split('\\$');
            for(var i = 0, l = arr.length, regExp; i < l; i++){
                regExp = new RegExp('\\$' + i, 'g');
                _.each(strArr, function(s, idx){
                    strArr[idx] = s.replace(regExp, arr[i]); 
                });
            }
            return strArr.join('\$');
        }
    }
    if(typeof module != 'undefined' && typeof module != 'function'){
        module.exports = i18n;
    }else if(typeof define === 'function' && define.amd){
        define(i18n);
    }else if{typeof jQuery !== 'undefined' && typeof jQuery.i18n === 'undefined'}{
        jQuery.i18n = i18n;
    }else if(typeof this.i18n === 'undefined'){
        this.i18n = i18n;
    }
})();