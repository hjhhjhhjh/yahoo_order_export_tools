(function(){
    if(!document.f2 || !document.f2.action || typeof jQuery == "undefined"){
        console.log("只支持在订单列表页面执行");
        alert("只支持在订单列表页面执行");
        return;
    }
    oDocumentWrite=null;
    document.write=function(html){
        if(!oDocumentWrite){
            oDocumentWrite = document.write;
            document.body.innerHTML = html;
        }else{
            document.body.innerHTML += html;
        }
    }
    var pageSize=parseInt($("#SearchRecordPage").val());
    var totalCount =parseInt( $("#TotalCount").val());
    var currentPage= parseInt($("#pagePage").val());
    var totalPages = parseInt((totalCount+pageSize-1)/pageSize);
    var link=[],data=[];
    for(var i=0;i<pageSize;i++){
        if($("#orderId"+i).length==1){
            link.push($("#orderId"+i).attr("onclick").split("'")[1]);
        }
    }
    var postdata={};
    $(document.f2).find("input").each((idx,item)=>{
        if(item.name && item.name!=""){
            postdata[item.name]=item.value;
        }
    })
    var postUrl = document.f2.action;
    getotherlink=function(page,toPage){
        if(location.href.startsWith("file://")){
            console.log("本地环境，直接返回。");
            return;
        }
        if(!toPage){
            toPage=totalPages;
        }
        if(page<=toPage){
            console.log("正在获取第 "+page+"/"+toPage+" 页");
            postdata["page"]=page;
            $.post(postUrl,postdata,function(d){
                for(var i=0;i<parseInt(pageSize);i++){
                    if($(d).find("#orderId"+i).length==1){
                        link.push($(d).find("#orderId"+i).attr("onclick").split("'")[1]);
                    }
                }
                page=page+1;
                getotherlink(page,toPage)
            })
        }else{
            console.log("所有页面获取完成，共有记录："+link.length);
        }
    }
    getInfo=function(){
        if(location.href.startsWith("file://")){
            data=[{"payInfo":"入金済み","cancelReason":"","cancelReasonDetail":"","parentOrderId":"","orderTime":"2019-12-22T20:09:29+09:00","releaseDate":"","deviceType":"3","isRoyaltyFix":"true","royaltyFixTime":"2019-12-26T11:35:52+09:00","firstOrderDoneDate":"2019-12-26","isLogin":"true","fspLicenseName":"プラチナ","usePointType":"T","isAffiliate":"false","orderId":"kidscoordinate-10000019","suspect":"0","suspectMessage":"","childOrderId":"","orderStatus":"5","isSeen":"true","beforeOrderStatus":"5","isUsePointFix":"","refundStatus":"","refundTotalPrice":"","shipZipCode":"6038112","shipPrefecture":"京都府","shipCity":"京都市北区","shipAddress1":"小山元町4 薮方","shipAddress2":"","shipPrefectureKana":"","shipCityKana":"","shipAddress1Kana":"","shipAddress2Kana":"","shipLastName":"中河","shipFirstName":"多香子","shipLastNameKana":"ナカガワ","shipFirstNameKana":"タカコ","shipPhoneNumber":"0754912041","shipEmgPhoneNumber":"","shipSection1Field":"","shipSection1Value":"","shipSection2Field":"","shipSection2Value":"","needGiftWrap":"","giftWrapType":"","giftWrapMessage":"","needGiftWrapPaper":"","giftWrapPaperType":"","giftWrapName":"","option1Field":"","option1Value":"","option2Field":"","option2Value":"","shipRequestDate":"","shipRequestTime":"","shipRequestTimeStart":"00","shipRequestTimeEnd":"","arriveType":"0","shipNotes":"","shipDate":"2019-12-25","arrivalDate":"2019-12-27","shipCompanyCode":"1002","shipInvoiceNumber1":"517766961342","shipInvoiceNumber2":"","shipUrl":"","shipMethod":"postage2","shipMethodName":"佐川急便","isLinkDeliverSeino":"false","beforeShipStatus":"3","billZipCode":"6038112","billPrefecture":"京都府","billCity":"京都市北区","billAddress1":"小山元町4 薮方","billAddress2":"","billPrefectureKana":"","billCityKana":"","billAddress1Kana":"","billAddress2Kana":"","billLastName":"中河","billFirstName":"多香子","billLastNameKana":"ナカガワ","billFirstNameKana":"タカコ","billPhoneNumber":"0754912041","billEmgPhoneNumber":"","billMailAddress":"lamune1107@gmail.com","needDetailedSlip":"","needReceipt":"","needBillSlip":"","buyerComments":"","billSection1Field":"","billSection1Value":"","billSection2Field":"","billSection2Value":"","payActionTime":"2019-12-26T11:35:52+09:00","ageConfirmField":"","ageConfirmValue":"","ageConfirmCheck":"","payMethod":"payment_a17","payMethodName":"PayPay残高払い","payMethodAmount":"481","payKind":"6","combinedPayMethod":"payment_a1","combinedPayMethodName":"クレジットカード決済","combinedPayMethodAmount":"2865","combinedPayKind":"0","settleStatus":"5","settleId":"k1912228582505","isAutoPayNo":"","cardPayType":"1","cardPayCount":"","payNo":"","payNoIssueDate":"","agencyNumber":"","confirmNumber":"","beforePayStatus":"1","paymentTitle":"","payment_sort":"a1%_^A_%a17%_^A_%a16%_^A_%a9%_^A_%a10%_^A_%a11%_^A_%a8%_^A_%a6%_^A_%a7%_^A_%b1%_^A_%d1","paymentTitleList[b1]":"城北信用金庫","paymentTitleList[d1]":"商品代引","useCouponData":"cDhyOTRtVkFEQ3hTJmtpZCYxNTc2NDY4NTgx\\A500円OFF-対象商品限定\\A1\\Aladiesfashion\\A1\\B","totalCouponDiscount":"500","shippingCouponDiscount":"0","shippingCouponFlg":"0","couponCampaignCode":"","totalMallCouponDiscount":"","giftWrapCharge":"0","shipCharge":"600","payCharge":"0","discount":"0","title1":"ダッフルコート レディース ロング アウター ジャケット グレー 秋冬 2019新作 人気","subCodeOption1":"","itemOption1":"カラー�グレー�サイズ�フリーサイズ","inscription1":"","itemId1":"1107lt3225","subCode1":"1107lt3225-01","unitPrice1":"2870","priceType1":"1","quantity1":"1","releaseDate1":"","pointFspCode1":"","unitGetPoint1":"28","getPointType1":"T","isGetPointFix1":"true","getPointFixDate1":"2019-12-27","lineTotalPrice1":"2870","isUsed1":"false","beforeReleaseDate1":"","subtotalPrice":"2870","usePoint":"124","totalPrice":"3346","itemCount":"1","cartMaxLine":"50","referer":"","entryPoint":"","isSeller":"false","csrf":"NjRjNGFiZjA4OTQ5ZDU2YjVjYzNkODcyODg4ZDE4MGVmNjQxNDgxNjU1Njk4NTM0YTNjMzgyOTc1ZDEyMGFlZllJM3ZzeUk4N2Y4cThjc0JyL0ZVbklCaVA1NFdiSENlYktQM1NkVEUrc0w2OWFybnNUSkhFc0R4QzVHNXRoWUJWQUxoYmJpQVhFQTlQQ3doZkt2YXZMeXhSdkFBZkFiZnlHR1ZmNUYwM2dLbTdZUXdSNTd1dEdZeUh5L1JDMjFmdGVnSUVBR3lMOUJ3amVrWU55YTFSQT09","yjbfp_items":"ua\u0002Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36\u0001lang\u0002zh-CN\u0001screen_height\u00021440\u0001screen_width\u00022560\u0001timezone_offset\u0002-480\u0001plugins\u0002Chrome PDF Plugin|Chrome PDF Viewer|Native Client\u0001canvas_image\u0002iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAACT0lEQVQ4T9WUP0hbURSHP6NV1Ka0JVAs1IiNf6igUkRwCA4uIi6iJIMQNzUZBLcQhIAIDg4uChrHEFARRINCQMgSUUFQQ6WkxjY0xhcSLOp7FlttUu4TK2IjYqfe6d7DPd8553d/72XxjytL5KfTs+nHcv4jQH8/LC7C/v7tYR88wugorK3B7OwjAddpPl+ESOSUnp5qNfSng74+CIdhefmmgjibzTAyApubEAiAwyERiym0t5fdBrjdYLHAxgbU119BBgfB6QRZFokwPw/RaIYRFAW0WrDZIhiN55hMlej10NICw8PnOBxhAoE3TE6eEYvJmEwVtzsQJ6sV/P4kVusBen0ZbW1PWV2Fy8sDPJ4kPl81ExNRIpETentr7gLW18Fo/IXdHkSSXuD3l7C3By7XDsGgFq+3lKkpIWIGQDoNlZXQ0PCZROKExsZazGYZr3efUMjAwoL2foDoSbz30JBMXV0Yp7OEo6NvHB6esbtbrYp4bwcCEI9DURF0dgbp6ChQBautfcXMzOuHAYRVDQYYG5NIpeKqUF1dVdjtufh8MD6eQQNRWRjF5YKdHQiFLnC7P6DTFVBcXIHNdvXMAwMZAFtb8P791aWlJaiqOsfj+Uh5uZ7m5peUlorqkEp9IRqV71r5ev68vAsk6ZTt7QTHxz/o7q4hkchCp0sTj8usrHwlJ0eDxfLurg9ERJLOmJv7hEYDra1v0eufqReTye9MT4fIzc2mqakYg+H53wEiqigX5OfnkJ2tfmvqEh5RlJ8UFj5Bo7mJ3+we+VP8DR//QTKrkbYiAAAAAElFTkSuQmCC","dummy":"","radCancelReason":"230"}];
            console.log("本地环境，直接返回。");
            return;
        }
        var orderCount=link.length;
        if(link.length>0){
            url = link.pop();
            console.log("正在获取数据：第 "+(link.length+1)+"/"+orderCount+" 个订单 ");
            $.get(url,function(d){
                var body = $(d);
                // "入金済み"
                allInputValue={};
                payInfo = body.find("#ordBasic").find("td:last").text().trim() ;
                allInputValue["payInfo"] = payInfo;
                body.find("input[name]").each((idx,input)=>{
                    allInputValue[input.name]=input.value;
                });
                
                data.push(allInputValue);
                console.log(allInputValue.orderId+" 有 "+allInputValue.itemCount + " 个商品,信息获取完成 ");
                getInfo();
            });
        }else{
            console.log("没有更多订单了");
        }
    }
    sortByPayTime=function(a,b){
        if(a.payActionTime!="" && b.payActionTime != ""){
            return new Date(a.payActionTime).getTime() - new Date(b.payActionTime).getTime();
        }else if(a.payActionTime!=""){
            return 1;
        }else if(b.payActionTime!=""){
            return -1;
        }else{
            return parseInt(a.orderId.split("-")[1])-parseInt(b.orderId.split("-")[1]);
        }
    }
    
    document.querySelectorAll("table").forEach(table=>table.remove());
    document.querySelectorAll("div").forEach(div=>div.remove());
    var tableStyle=" table.gridtable {font-family: verdana,arial,sans-serif;font-size:11px;color:#333333;border-width: 1px;border-color: #666666;border-collapse: collapse;width:1000px}";
    var tableStyleTh=" table.gridtable th { border-width: 1px;padding: 8px;border-style: solid;border-color: #666666; background-color: #dedede;}";
    var tableStyleTd=" table.gridtable td {border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff;}";
    document.write("<style>label{cursor:pointer} "+tableStyle+tableStyleTh+tableStyleTd+"</style>");
    
    var columns={"序号":"index","订单ID":"orderId","商品名称":"itemName","商品首图":"firstImg","商品编码":"itemId","商品子编号":"subCode","商品属性":"itemOption",
    "收件电话":"shipPhoneNumber","收件人":"shipLastName+shipFirstName","收件邮编":"shipZipCode","收件人地址":"shipPrefecture+shipCity+shipAddress1+shipAddress2",
    "物品数量":"quantity","单价金额":"unitPrice","金额":"lineTotalPrice","订单总价":"totalPrice","付款状态":"payInfo","订单时间":"orderTime","支付时间":"payActionTime"};
    // var default_th=["序号","订单ID","商品名称","商品首图","商品编码","商品子编号","商品属性","收件电话","收件人","收件邮编","收件人地址","物品数量","单价金额","金额","订单总价","付款状态","订单时间","支付时间"]
    var arr=[];Object.keys(columns).forEach((item,index)=>{arr.push('<label for="'+item+'" >'+item+'</label><input type="checkbox" id="'+item+
    '" value="'+columns[item]+'" class="dataColumn" onchange="addColumn(this)" checked="checked"/><span style="color:red;font-size:21px" id="'+item+'_number">'+(index+1)+'</span>')});
    document.write("<div><h1>默认导出数据</h1></div>");
    getTrStr=function(arr,max_td_count){
        var trs = [],tds=[];
        for(var i=0;i<arr.length;i++){
            tds.push("<td>" + arr[i] + "</td>");
            if(tds.length==max_td_count){
                trs.push("<tr>"+tds.join("")+"</tr>");
                tds=[];
            }
        }
        if(tds.length > 0 ){
            while( tds.length < max_td_count){
                tds.push("<td>&nbsp;</td>");
            }
            trs.push("<tr>"+tds.join("")+"</tr>");
        }
        return trs.join("");
    }

    document.write("<table class=gridtable >"+getTrStr(arr,9)+"</table>");
    addColumn=function(cbx){
        var id = cbx.id;
        var span = document.querySelector("#"+id+"_number");
        var allCheckedInputs = document.querySelectorAll(".dataColumn:checked");
        if(cbx.checked){
            span.innerHTML = allCheckedInputs.length;
        }else{
            var number = parseInt(span.innerHTML);
            span.innerHTML = "";
            allCheckedInputs.forEach(input=>{
                span = document.querySelector("#"+input.id+"_number");
                var thisNumber = parseInt(span.innerHTML);
                if(thisNumber>number){
                    span.innerHTML = thisNumber-1;
                }
            });
        }
    }
    // default_th.forEach(id=>{document.querySelector("#"+id).click()});
    document.write("<div><h1>可选导出数据 &nbsp;<label for='showOptionTab'>显示</label><input type='checkbox' id='showOptionTab' onchange='toggleOtherOptions(this)' /></h1></div>")
    toggleOtherOptions=function(cbx){
        otherOptionsTab = document.querySelector("#otherOptionsTab");
        if(cbx.checked){
            otherOptionsTab.style.display="block";
        }else{
            otherOptionsTab.style.display="none";
        }
    }
    defaultColumnStr = Object.values(columns).join(";");
    arr=[];
    allColumns = {"cancelReason":"","cancelReasonDetail":"","parentOrderId":"","orderTime":"","releaseDate":"","deviceType":"","isRoyaltyFix":"","royaltyFixTime":"","firstOrderDoneDate":"","isLogin":"","fspLicenseName":"","usePointType":"","isAffiliate":"","orderId":"","suspect":"","suspectMessage":"","childOrderId":"","orderStatus":"","isSeen":"","beforeOrderStatus":"","isUsePointFix":"","refundStatus":"","refundTotalPrice":"","shipZipCode":"","shipPrefecture":"","shipCity":"","shipAddress1":"","shipAddress2":"","shipPrefectureKana":"","shipCityKana":"","shipAddress1Kana":"","shipAddress2Kana":"","shipLastName":"","shipFirstName":"","shipLastNameKana":"","shipFirstNameKana":"","shipPhoneNumber":"","shipEmgPhoneNumber":"","shipSection1Field":"","shipSection1Value":"","shipSection2Field":"","shipSection2Value":"","needGiftWrap":"","giftWrapType":"","giftWrapMessage":"","needGiftWrapPaper":"","giftWrapPaperType":"","giftWrapName":"","option1Field":"","option1Value":"","option2Field":"","option2Value":"","shipRequestDate":"","shipRequestTime":"","shipRequestTimeStart":"","shipRequestTimeEnd":"","arriveType":"","shipNotes":"","shipDate":"","arrivalDate":"","shipCompanyCode":"","shipInvoiceNumber1":"","shipInvoiceNumber2":"","shipUrl":"","shipMethod":"","shipMethodName":"","isLinkDeliverSeino":"","beforeShipStatus":"","billZipCode":"","billPrefecture":"","billCity":"","billAddress1":"","billAddress2":"","billPrefectureKana":"","billCityKana":"","billAddress1Kana":"","billAddress2Kana":"","billLastName":"","billFirstName":"","billLastNameKana":"","billFirstNameKana":"","billPhoneNumber":"","billEmgPhoneNumber":"","billMailAddress":"","needDetailedSlip":"","needReceipt":"","needBillSlip":"","buyerComments":"","billSection1Field":"","billSection1Value":"","billSection2Field":"","billSection2Value":"","payActionTime":"","ageConfirmField":"","ageConfirmValue":"","ageConfirmCheck":"","payMethod":"","payMethodName":"","payMethodAmount":"","payKind":"","combinedPayMethod":"","combinedPayMethodName":"","combinedPayMethodAmount":"","combinedPayKind":"","settleStatus":"","settleId":"","isAutoPayNo":"","cardPayType":"","cardPayCount":"","payNo":"","payNoIssueDate":"","agencyNumber":"","confirmNumber":"","beforePayStatus":"","paymentTitle":"","payment_sort":"","paymentTitleList[b1]":"","paymentTitleList[d1]":"","useCouponData":"","totalCouponDiscount":"","shippingCouponDiscount":"","shippingCouponFlg":"","couponCampaignCode":"","totalMallCouponDiscount":"","giftWrapCharge":"","shipCharge":"","payCharge":"","discount":"","title1":"","subCodeOption1":"","itemOption1":"","inscription1":"","itemId1":"","subCode1":"","unitPrice1":"","priceType1":"","quantity1":"","releaseDate1":"","pointFspCode1":"","unitGetPoint1":"","getPointType1":"","isGetPointFix1":"","getPointFixDate1":"","lineTotalPrice1":"","isUsed1":"","beforeReleaseDate1":"","subtotalPrice":"","usePoint":"","totalPrice":"","itemCount":"","cartMaxLine":"","referer":"","entryPoint":"","isSeller":"","csrf":"","yjbfp_items":"","dummy":"","radCancelReason":""};
    existColumns={};
    Object.keys(allColumns).forEach(item=>{
        oKey = item.replace(/\d+$/,"");
        if(!existColumns[oKey] && defaultColumnStr.indexOf(oKey)==-1){
            arr.push('<label for="'+oKey+'">'+oKey+'</label><br/><input type="checkbox" id="'+oKey+'" value="'+oKey+'" class="dataColumn" onchange="addColumn(this)"/><span style="color:red;font-size:21px" id="'+oKey+'_number"></span>');
            existColumns[oKey]=true;
        }
    });

    document.write("<table class=gridtable id='otherOptionsTab' style='display:none'>"+getTrStr(arr,7)+"</table>");
    
    document.write("<div><h1>导出设置</h1></div>")
    exportOption="<tr><td><label for='onlyPay'>只导出支付完成的订单：</label><input id='onlyPay' type='checkbox' value='1' checked='checked' /> &nbsp; <i style='font-size:12px;color:#666'>如果也要导到未支付订单，取消勾选</i> </td></tr>";
    exportOption += "<tr><td>导出支付时间之后的订单：日期：<input id='payTimeAfterDate' type='date' value='' placeholder='2020-04-14' />&nbsp;时间：<input id='payTimeAfterTime' type='time' value='' placeholder='00:00:00' />&nbsp;<i style='font-size:12px;color:#666'>设置时间后，将导出支付时间在这个之后的订单</i></td></tr>";
    exportOption +="<tr><td>导出页数范围：<input id='startPage' type='number' value='"+currentPage+"' min='"+currentPage+"' max='"+totalPages+"' maxlength='3' size='3' style='width:3em'/> - "+
            "<input id='endPage' type='number'  value='"+totalPages+"'  min='"+currentPage+"' max='"+totalPages+"' maxlength='3' size='3' style='width:3em' />&nbsp; <i style='font-size:12px;color:#666'>修改此项可以导出指定页数的数据，默认是全部页</i> </td></tr>";
    exportOption += "<tr><td style='text-align:center'><a href='javascript:showData()' style='font-size:50px;color:red;font-weight:bold;cursor:pointer' >生成数据</a>"+
    "&nbsp;&nbsp;<a href='javascript:location.reload()' style='font-size:20px;color:#000;font-weight:bold;cursor:pointer' >退出</a>&nbsp;&nbsp;&nbsp;&nbsp;"+
    "<a href='javascript:save2Excel()' id='downloadFile' style='font-size:50px;font-weight:bold;cursor:pointer;display:none;' >下载表格</a></td></tr>";
    exportOption += "<tr style='display:none'><td><div id=\"cMsg\" style=\"text-align:left;color:red;height:100px;width:100%;overflow-y:scroll\"></div></td></tr>";
    document.write("<table class=gridtable>"+exportOption+"</table><br/>");
    
    showData=function(action){
        o_console_log = console.log;
        cMsg = $("#cMsg");
        cMsg.parents("tr").show();
        cMsg = cMsg[0];
        console.log=function(msg){
            o_console_log(msg);
            cMsg.innerHTML=cMsg.innerHTML+"<br/>"+msg;
            cMsg.scrollTop = cMsg.scrollHeight;
        }
        var startPage = parseInt(document.querySelector("#startPage").value);
        var endPage = parseInt(document.querySelector("#endPage").value);
        if(startPage==currentPage){
            startPage = startPage+1; //当前页数据已经存起来了,直接从下一页开始
        }
        $.ajaxSetup({async:false});
        if(startPage<=endPage){
            getotherlink(startPage,endPage);
        }

        getInfo();
        $.ajaxSetup({async:true});

        var allCheckedInputs = document.querySelectorAll(".dataColumn:checked");
        var dataKeys = [];
        var ths = [];
        allCheckedInputs.forEach(input=>{
            var index = parseInt($(input).next().text())-1;
            dataKeys[index]=input.value;
            ths[index]=input.id;
        });
        var tableTH = "<tr><th>" + ths.join("</th><th>")+"</th></tr>";
        var list=[];
        // data.sort(sortByPayTime);
        var onlyPay = $("#onlyPay")[0].checked;
        var payTimeAfter = $("#payTimeAfterDate").val() +" "+ $("#payTimeAfterTime").val();
        if(payTimeAfter.length<5){
            payTimeAfter=false;
        }
        data.forEach((obj,objIndex)=>{
            arrKey = {};
            itemCount = parseInt(obj.itemCount);
            obj.itemCount = itemCount;
            Object.keys(obj).forEach((key)=>{
                oKey = key.replace(/\d+$/,"");
                if(obj.hasOwnProperty(oKey+itemCount) && !arrKey[oKey]){
                    arrKey[oKey]=oKey;
                }
            });
            
            Object.keys(arrKey).forEach((key)=>{
                obj[key]=[];
                for(var i=1;i<=itemCount;i++){
                    obj[key].push(obj[key+""+i]);
                }
            })
            
            shopName = obj.orderId.split("-")[0];
            obj.itemName=[];
            obj.firstImg=[];
            
            
            for(var i=1;i<=itemCount;i++){
                obj.firstImg.push("<img src=\"https://item-shopping.c.yimg.jp/i/d/"+shopName+"_"+obj["itemId"+i]+"\" width=106 height=106 />");
                obj.itemName.push("<a href=\"https://store.shopping.yahoo.co.jp/"+shopName+"/"+obj["itemId"+i]+".html\" target=\"_blank\">"+obj["title"+i]+"</a>");
            }
           
        });
        data.forEach((obj,objIndex)=>{
            payActionTime = obj.payActionTime;
            if(onlyPay && payActionTime == ""){
                return true;
            }
            if(payTimeAfter && payActionTime!= "" && new Date(payActionTime).getTime() < new Date(payTimeAfter).getTime() ){
                return true;
            }
            arr = [];
            arrIndex=[];
            listLength=list.length;
            if(obj.itemCount > 1) {
                obj.index=[];
                for(var i=1;i<=obj.itemCount;i++){
                    obj.index.push(listLength+i);
                }
            }else{
                obj.index=listLength+1;
            }
            dataKeys.forEach(key=>{
                if(key.indexOf("+")!=-1){
                    keyArr = key.split("+");
                    values=[];
                    for(var i=0;i<keyArr.length;i++){
                        value = obj[keyArr[i]];
                        if(value){
                            values.push(value);
                        }
                    }
                    arr.push(values.join(""));
                }else{
                    value = obj[key];
                    if(!value){
                        value="";
                    }
                    if(typeof value == "object" && typeof value.push == "function"){//是数组
                        arrIndex.push({"index":arr.length,"values":value,"key":key});
                        arr.push(value);
                    }else{
                        arr.push(value);
                    }
                }
            });
            if(arrIndex.length>0){
                arrLen = arrIndex[0].values.length;
                for(var i=0;i<arrLen;i++){
                    var arr2 = arr.concat();
                    arrIndex.forEach(v=>{
                        // if(v.key=="itemOption"){
                        //     itemOptions = v.values[i].split("�");
                        //     if(itemOptions.length>1){
                        //         arr2[v.index] = "";
                        //         itemOptions.forEach((n,ni)=>{
                        //             if(ni%2==0){
                        //                 arr2[v.index] += n + ":";
                        //             }else{
                        //                 arr2[v.index] += n + "<br/>";
                        //             }
                        //         })
                        //     }else{
                        //         arr2[v.index]=v.values[i];
                        //     }
                        // }else{
                        //     arr2[v.index]=v.values[i];
                        // }
                        if(v.key=="itemOption"){
                            arr2[v.index]=v.values[i].replace(/�/g," ");
                        }else{
                            arr2[v.index]=v.values[i];
                        }
                    })
                    list.push(arr2);
                }
            }else{
                list.push(arr);
            }
        });
        trs=[tableTH];
        for(var i=0;i<list.length;i++){
            var arr = list[i];
            trs.push("<tr><td>"+arr.join("</td><td>")+"</td></tr>");
        }
        var orderTable = document.querySelector("#orderTable");
        if(orderTable){
            orderTable.innerHTML = trs.join("");
        }else{
            document.write("<table class=gridtable id=\"orderTable\" style='width:100%'>"+trs.join("")+"</table><br/><br/>");
            orderTable = document.querySelector("#orderTable");
        }
        if(trs.length>1){
            $("#downloadFile").show();
            cMsg.scrollTop = cMsg.scrollHeight;
        }
        console.log = o_console_log ;
    }

    save2Excel=function(){
        isMac = navigator.userAgent.toLowerCase().indexOf("mac") !=-1;
        isWindows = navigator.userAgent.toLowerCase().indexOf("windows") !=-1;
        var orderTable = $("#orderTable");
        var imgIdx = -1;
        if(isMac){
            orderTable.find("tr:eq(1)").find("td").each((idx,td)=>{
                if($(td).find("img").length==1){
                    imgIdx = idx;
                    return false;
                }
            });
            if(imgIdx!=-1){//有图片显示，需要增加那一列的宽和高
                orderTable.find("th:eq("+imgIdx+")").width("165px");
                orderTable.find("tr:gt(0)").height("165px");
            }
        }
        
        var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"; 
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'; 
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel'; 
        excelFile += '; charset=UTF-8">'; 
        excelFile += "<head>"; 
        excelFile += "<!--[if gte mso 9]>"; 
        excelFile += "<xml>"; 
        excelFile += "<x:ExcelWorkbook>"; 
        excelFile += "<x:ExcelWorksheets>"; 
        excelFile += "<x:ExcelWorksheet>"; 
        excelFile += "<x:Name>"; 
        excelFile += "{worksheet}"; 
        excelFile += "</x:Name>"; 
        excelFile += "<x:WorksheetOptions>"; 
        excelFile += "<x:DisplayGridlines/>"; 
        excelFile += "</x:WorksheetOptions>"; 
        excelFile += "</x:ExcelWorksheet>"; 
        excelFile += "</x:ExcelWorksheets>"; 
        excelFile += "</x:ExcelWorkbook>"; 
        excelFile += "</xml>"; 
        excelFile += "<![endif]-->"; 
        excelFile += "</head>"; 
        excelFile += "<body>"; 
        excelFile += orderTable[0].outerHTML; 
        excelFile += "</body>"; 
        excelFile += "</html>"; 

        if(imgIdx!=-1){//有图片显示，需要增加那一列的宽和高
            orderTable.find("th:eq("+imgIdx+")").width("");
            orderTable.find("tr:gt(0)").height("");
        }

        var now = new Date();
        var date = now.getDate();
        var month = now.getMonth()+1;
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var FileName = now.getFullYear()+""+(month<10?"0"+month:month)+""+(date<10?"0"+date:date)+""+hour+""+minute+""+second;
            
        var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile); 
        

            
        var link = document.createElement("a");   
        link.href = uri; 
            
        link.style = "visibility:hidden"; 
        link.download = FileName + ".xls"; 
            
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link); 

    }
})();