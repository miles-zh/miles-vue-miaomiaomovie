
// 城市定位弹窗组件

import Vue from 'vue'
import MessageBox from './MessageBox/index.vue'

export var messageBox=(function(){
    
    
    return function(opts){   // 配置参数
        var defaults = { // 默认值
            titel: '',
            content: '',
            cancel: '',
            ok: '',
            handleCancel: null,
            handleOk: null
        }
        var myComponent = Vue.extend(MessageBox);
        for(var attr in opts){
            defaults[attr]=opts[attr]
        }
        
        var vm=new myComponent({
            el:document.createElement('div'),
            data:{
                title:defaults.title,
                content:defaults.content,
                cancel:defaults.cancel,
                ok:defaults.ok,
            },
            methods:{
                handleCancel(){
                    // console.log(1)
                    defaults.handleCancel && defaults.handleCancel.call(this)
                    document.body.removeChild(vm.$el)   // 点击消掉弹窗
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this)
                    document.body.removeChild(vm.$el)  // 点击消掉弹窗
                }
            }
        })
        document.body.appendChild(vm.$el)   // 将弹窗加入到页面中去
    }
})()