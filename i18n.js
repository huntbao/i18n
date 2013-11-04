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
(function ($) {
    var i18n = {
        __messageBundle: {},
        
        get: function () {
            if ($.isArray(arguments[1])) {
                return i18n.__format(this.get(arguments[0]), arguments[1]);
            }
            var key = i18n.__messageBundle[arguments[0]];
            return key ? key.message : arguments[0];
        },

        getMessage: function () {
            return this.get.apply(this, arguments);
        },

        getMessages: function (keyArr) {
            if (!$.isArray(keyArr)) return;
            var messages = [];
            for (var i = 0, l = keyArr.length; i < l; i++) {
                messages.push(this.get(keyArr[i]));
            }
            return messages;
        },

        setMessageBundle: function (moduleMessageBundle, messageBundle, moduleNamespace) {
            if (!messageBundle || !moduleNamespace) {
                $.error('Both messages bundle and module namespace are required.');
                return;
            }
            var __moduleNamespace = '__module__' + moduleNamespace;
            if (messageBundle[__moduleNamespace]) {
                $.error('Module<' + moduleNamespace + '> has already existed.');
                return;
            }
            messageBundle[__moduleNamespace] = true;
            for (var p in moduleMessageBundle) {
                messageBundle[moduleNamespace + '.' + p] = moduleMessageBundle[p];
            }
            i18n.__messageBundle = messageBundle;
        },

        __format: function (str, arr) {
            var strArr = str.split('\\$');
            for (var i = 0, l = arr.length, regExp; i < l; i++) {
                regExp = new RegExp('\\$' + i, 'g');
                $.each(strArr, function (s, idx) {
                    strArr[idx] = s.replace(regExp, arr[i]);
                });
            }
            return strArr.join('\$');
        }
    }

    // export public method
    $.i18n = $;
})(jQuery);
