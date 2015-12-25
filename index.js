"use strict"

/*
 * cli arguments parser
 *
 * version: 1.0.0
 * author: wallax
 * email: wallax@126.com
 *
 * usage:
 * var cli = require("cli-args.js")
 * // parse "node app -p 80 --host google.com name foo"
 * // result: {"p": 80, "host": "google.com", "name": "foo"}
 * var args = cli.parseLine()
 *
 * // parse "node app -dir=/home --log=admin.log type=bar"
 * // result: {"dir": "/home", "log": "admin.log", "type": "bar"}
 * var args = cli.parseEqual()
 *
 * // parse "node app install cli" to operate="install", name="cli"
 * // result: {"operate": "install", "name": "cli"}
 * var args = cli.parseFlat(["operate", "name"])
 *
 * // parse "node app install -p 80 --dir=/root logfile=foobar.log"
 * // result: {"operate": "install", "p": 80, "dir": "/root", "logfile": "foobar.log"}
 * var args = cli.parseMix(["operate"])
 *
 */

module.exports = {
    parseLine: function(){
        // this func parse arguments like "node app -p 80 --host google.com"
        var res = {}
        var args = process.argv
        if(args.length > 2){
            for(var i = 2; i < args.length; i++){
                if(args[i] && args[i + 1]){
                    if(/--.*/.test(args[i])){
                        var argname = args[i].match(/--(.*)/)[1]
                        res[argname] = args[i + 1]
                    }else if(/-.*/.test(args[i])){
                        var argname = args[i].match(/-(.*)/)[1]
                        res[argname] = args[i + 1]
                    }else{
                        res[args[i]] = args[i + 1]
                    }
                    i++
                }
            }
        }
        return res
    },
    
    parseEqual: function(){
        // this func parse arguments like "node app -port=80 --dir=/root --bind-ip=127.0.0.1"
        var res = {}
        var args = process.argv
        if(args.length > 2){
            for(var i = 2; i < args.length; i++){
                if(/--.*?\=.*/.test(args[i])){
                    var tmp = args[i].match(/--(.*?)\=(.*)/)
                    res[tmp[1]] = tmp[2]
                }else if(/-(.*?)\=(.*)/.test(args[i])){
                    var tmp = args[i].match(/-(.*?)\=(.*)/)
                    res[tmp[1]] = tmp[2]
                }else{
                    var tmp = args[i].match(/(.*?)\=(.*)/)
                    res[tmp[1]] = tmp[2]
                }
            }
        }
        return res
    },
    
    parseFlat: function(arr){
        // this func parse arguments like "node app /root 80"
        var res = {}
        var args = process.argv
        if(args.length > 2){
            for(var i = 2; i < args.length; i++){
                if(args[i] && arr[i - 2]){
                    res[arr[i - 2]] = args[i]
                }
            }
        }
        return res
    },
    
    parseMix: function(arr){
        // this func parse arguments like "node app install -p 20 --dir=/root"
        var res = {}
        var pos = 0
        var args = process.argv
        if(args.length > 2){
            for(var i = 2; i < args.length; i++){
                if(/--.*/.test(args[i])){
                    if(/--.*?\=.*/.test(args[i])){
                        var tmp = args[i].match(/--(.*?)\=(.*)/)
                        res[tmp[1]] = tmp[2]
                    }else{
                        var key = args[i].match(/--(.*)/)[1]
                        i++
                        var val = args[i]
                        res[key] = val
                    }
                }else if(/-.*/.test(args[i])){
                    if(/-.*?\=.*/.test(args[i])){
                        var tmp = args[i].match(/-(.*?)\=(.*)/)
                        res[tmp[1]] = tmp[2]
                    }else{
                        var key = args[i].match(/-(.*)/)[1]
                        i++
                        var val = args[i]
                        res[key] = val
                    }
                }else{
                    if(/.*?\=.*/.test(args[i])){
                        var tmp = args[i].match(/(.*?)\=(.*)/)
                        res[tmp[1]] = tmp[2]
                    }else{
                        res[arr[pos]] = args[i]
                        pos++
                    }
                }
            }
        }
        return res
    }
}