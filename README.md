# 可以快速导出订单，方便发货处理
## 使用chrome 或才 firefox 开发者工具，在控制台里直接执行代码。复制，粘贴，回车，即可轻松搞定
### 第一步 ，打开订单页面，需要导出的数据的标签，F12 或者  Fn+F12 打开控制台
### 第二步， 复制 下面内容 （demo.js 里的第一段内容），在控制台里粘贴，回车

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
getotherlink=function(page,toPage){
    if(!toPage){
        toPage=totalPages
    }
    if(page<=toPage){
        console.log("正在获取第"+page+"页");
        postdata["page"]=page;
        $.post(document.f2.action,postdata,function(d){
            for(var i=0;i<parseInt(pageSize);i++){
                if($(d).find("#orderId"+i).length==1){
                    link.push($(d).find("#orderId"+i).attr("onclick").split("'")[1]);
                }
            }
            page=page+1
            getotherlink(page)
        })
    }else{
        console.log("所有页面获取完成，共有记录："+link.length);
    }
}
getInfo=function(){
    if(link.length>0){
        url = link.pop();
        console.log("正在获取数据："+url+"，还有 "+link.length+" 个订单")
        $.get(url,function(d){
            var body = $(d);
            // "入金済み"
            payInfo = body.find("#ordBasic").find("td:last").text().trim() ;
            allInputValue={};
            itemCode=[];
            quantity=[];
            itemPrice=[];
            unitPrice=[];
            title=[];
            body.find("input[name]").each((idx,input)=>{
                allInputValue[input.name]=input.value;
            })

            orderId=allInputValue.orderId;
            shipPhoneNumber=allInputValue.shipPhoneNumber;
            shipZipCode=allInputValue.shipZipCode;
            shipPrefecture=allInputValue.shipPrefecture;
            shipCity=allInputValue.shipCity;
            shipAddress1=allInputValue.shipAddress1;
            shipAddress2=allInputValue.shipAddress2;
            shipLastName=allInputValue.shipLastName;
            orderTime=allInputValue.orderTime;
            payActionTime=allInputValue.payActionTime;
            totalPrice=allInputValue.totalPrice;
            itemCount=parseInt(allInputValue.itemCount);
            
            
            shipAddr = shipPrefecture + shipCity+shipAddress1+shipAddress2;
            shipName = shipLastName + shipFirstName;
            
            for(var i=1;i<=itemCount;i++){
                itemCode.push(allInputValue["itemId"+i]);
                quantity.push(allInputValue["quantity"+i]);
                itemPrice.push(allInputValue["lineTotalPrice"+i]);
                unitPrice.push(allInputValue["unitPrice"+i]);
                title.push(allInputValue["title"+i]);
            }
        
        
            for(var i=0;i<itemCount;i++){
                tempArr = [orderId,orderTime,title[i],itemCode[i],shipPhoneNumber,shipName,shipZipCode,shipAddr,quantity[i],unitPrice[i],totalPrice,payInfo,payActionTime]
                data.push(tempArr);
            }
            console.log(orderId+" 有 "+itemCount + " 个商品,信息获取完成 ")
            
            getInfo();
        });
    }else{
        console.log("这一页弄完了")
    }
}
function showData(onlyPay,payTimeAfter){
    th=["订单id","订单时间","商品名称","商品编码","收件电话","收件人","收件邮编","收件人地址","物品数量","单价金额","合計金額","付款状态","支付时间"]
    trs=[];
    trs.push("<th>"+th.join("</th><th>")+"</th>");
    data.sort(function(a,b){
        if(a.payActionTime!="" && b.payActionTime != ""){
            return new Date(a.payActionTime).getTime() - new Date(b.payActionTime).getTime();
        }else if(a.payActionTime!=""){
            return 1;
        }else if(b.payActionTime!=""){
            return -1;
        }else{
            return parseInt(a.orderId.split("-")[1])-parseInt(b.orderId.split("-")[1])
        }
    })
    
    for(var i=0;i<data.length;i++){
        infoArr = data[i];
        if(onlyPay==1 && infoArr[12] == ""){
            continue;
        }
        if(payTimeAfter!="" && infoArr[12] != "" && new Date(infoArr[12]).getTime() < new Date(payTimeAfter).getTime() ){
            continue;
        }
        trs.push("<td>"+infoArr.join("</td><td>")+"</td>");
    }
    document.write("<table border=\"1\"><tr>"+trs.join("</tr><tr>")+"</tr></table>");
}


### 如果有多页数据，需要获取其它页的数据 ; 复制下面代码，在控制台里粘贴，回车。
//执行时间根据页数多少决定，每获取一页订单，都会有输出信息，等待执行完成继续下面动作；如果没有多页数据，跳过此步
getotherlink(2);

### 获取订单详情数据; 复制下面代码，在控制台里粘贴，回车。 
//这个时间有些久，根据订单数来决定的，每获取到一个订单，都会有输出信息，等待执行完成继续下面动作。 
getInfo();

### 下面2句代码，是数据内容定制;复制下面代码，在控制台里粘贴，回车。
//意思是只导出付过款的订单，如果想导出所有订单，将onlyPay=1 改成 onlyPay=0;
var onlyPay=1;

//支付时间设置，如果设置了时间，将导出支付时间在这个之后的订单
//时间格式 “2020-04-14T18:43:12+09:00”  或者  “2020-04-14 18:43:12”
var payTimeAfter="";

### 生成数据,数据将在执行完后展示在当前的网页上； 复制下面代码，在控制台里粘贴，回车。
showData(onlyPay,payTimeAfter);

### 将网页上的数据保存到Excel; 在网页上右键，全选，再复制，打开Excel，点击单元格A1，粘贴。
