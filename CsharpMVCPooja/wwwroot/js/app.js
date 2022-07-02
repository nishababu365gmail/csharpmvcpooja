const btnAddMore = document.getElementById('btnAdd')
const btnSaveDb = document.getElementById('btnSaveDb')

const txtname=document.getElementById('txtName')
const cmbstar = document. getElementById("cmbstar");
const cmbvazhipadu = document. getElementById("cmbvazhipaduname");
const txtprice=document.getElementById('txtprice')
const txtquantity=document.getElementById('txtquantity')
const txttotalamount=document.getElementById('txttotalamount')
const divtoadd = document.getElementsByClassName('items-list-containter')
const partytd = document.getElementsByClassName("partytd")
const modalokbutton = document.querySelector(".modal__action--negative ")
const backdrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal')

function fnCloseModal() {
    backdrop.style.display = 'none'
    modal.style.display = 'none'
}
if (backdrop!=null)
    backdrop.addEventListener('click', fnCloseModal)
if (modalokbutton != null)
modalokbutton.addEventListener('click', fnCloseModal)
//const modal = document.querySelector('.modal')
for (let i = 0; i <= partytd.length; i++) {
    if (partytd[i] != null) {
    partytd[i].addEventListener('click', function (event) {
        
        const dates = event.currentTarget.dataset.partydate
        const venues = event.currentTarget.dataset.partyvenue
        const times = event.currentTarget.dataset.partytime
        const datesplit = dates.split(",")
        const venuesplit = venues.split(",")
        const timesplit = times.split(",")
        
        backdrop.style.display = 'block'
        modal.style.display = 'block'
        modal.setAttribute("data-id", 2);
        modal.querySelector('ul').innerHTML=''
        
        for (let i = 0; i < datesplit.length-1; i++) {
          let   listring = `Party at ${venuesplit[i]} on ${timesplit[i]}`
            const li = document.createElement('li')
            li.innerHTML = listring
            //const ulelement = modal.querySelector('ul')
            modal.querySelector('ul').appendChild(li)
           // ulelement.appendChild(li)
        }
    })
    }
}

itemlist=[]
itemobject={name:'',starname:'',vazhipaduname:'',price:0.0,quantity:0.0,total:0.0}
const fnAddItems=(event)=>{
    event.preventDefault()
    //const itemtr=document.createElement('tr')
    
    // const nametd=document.createElement('td')
    // nametd.textContent=txtname.value
    // itemtr.appendChild(nametd)
   // createcolumn(itemtr,txtname.value)

   // const startext = cmbstar. options[cmbstar. selectedIndex].text;
    // const startd=document.createElement('td')
    // startd.textContent=startext
    // itemtr.appendChild(startd)
   // createcolumn(itemtr,startext)
   // const vazhipadutext = cmbvazhipadu. options[cmbvazhipadu. selectedIndex].text;
    // const vazhipadutd=document.createElement('td')
    // vazhipadutd.textContent=vazhipadutext
    // itemtr.appendChild(vazhipadutd)
    //createcolumn(itemtr,vazhipadutext)
    // const prizetd=document.createElement('td')
    // prizetd.textContent=txtprice.value
    // itemtr.appendChild(prizetd)
   // createcolumn(itemtr,txtprice.value)
    // const quantitytd=document.createElement('td')
    // quantitytd.textContent=txtquantity.value
    // itemtr.appendChild(quantitytd)
   // createcolumn(itemtr,txtquantity.value)
    // const totaltd=document.createElement('td')
    // totaltd.textContent=txttotalamount.value
    // itemtr.appendChild(totaltd)
    //createcolumn(itemtr,txttotalamount.value)
   
    // const itemobject = new Object();   
    // itemobject.name=txtname.value
    // const startext = cmbstar.options[cmbstar. selectedIndex].text;
    // itemobject.starname=startext
    // const vazhipadutext = cmbvazhipadu.options[cmbvazhipadu. selectedIndex].text;
    // itemobject.vazhipaduname=vazhipadutext
    // itemobject.prize=txtprice.value
    // itemobject.quantity=txtquantity.value
    // itemobject.total=txttotalamount.value
    const localitemobject=createVazhipaduLineItem()
    itemlist.push(localitemobject)
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})    
    itemlist.forEach(elements=>{
        const keys=Object.keys(elements)
        const itemtr=document.createElement('tr')
        keys.forEach(key=>{
        createcolumn(itemtr,elements[key])
        document.getElementById('item-container').appendChild(itemtr)
        })
    })
    
    //console.log(calculatetotal())
    document.getElementById('mytotal').textContent = calculatetotal()
    
    }
function createcolumn(trvalue,tdvalue){
    const generaltd=document.createElement('td')
    generaltd.style.textAlign='right'
    generaltd.textContent=tdvalue
    trvalue.appendChild(generaltd)
}  
function calculatetotal(){
    let sum=0;
    itemlist.forEach(element => {
        sum=sum+parseInt(element.total)
    });
    return sum;
}
const fnCalculateItemTotal=()=>{
    txttotalamount.value=parseInt(txtprice.value)* parseInt(txtquantity.value)
}
const createVazhipaduLineItem=()=>{
    const itemobject = new Object();   
    itemobject.name=txtname.value
    const startext = cmbstar.options[cmbstar. selectedIndex].text;
    itemobject.starname=startext
    const vazhipadutext = cmbvazhipadu.options[cmbvazhipadu. selectedIndex].text;
    itemobject.vazhipaduname=vazhipadutext
    itemobject.prize=txtprice.value
    itemobject.quantity=txtquantity.value
    itemobject.total=txttotalamount.value
    return itemobject
}
const fnShowModal = (event) => {
    alert(event.target)
    const backdrop = document.querySelector('backdrop')
    const modal = document.querySelector('modal')
    backdrop.style.display = 'block'
    modal.style.display = 'block'
}
function OnSubmit() {

    //let ModelObject = { Name: $("#txtName").val(), Gender: $("#drpGender option:Selected").text(), Role: $("#drpRole option:Selected").text() }
    //let ModelObject = [
    //    { Name: 'Nisha', Gender: 'Female', Role: 'lead' },
    //    { Name: 'Babu', Gender: 'Male', Role: 'Sooper lead' },]
    let ModelObject = itemlist
    alert(JSON.stringify(ModelObject))
    console.log(itemlist)
    $.ajax({

        type: "get",

        url: '/VazhiPadu/CreateVazhiPadu',

        data: { nisha: JSON.stringify(ModelObject)} ,

        contentType: "application/json; charset=utf-8",

        dataType: "json",

        success: function (data) {

            let output = data.map(i => "<tr><td>" + i.name + "</td><td>" + i.gender + "</td><td>" + i.role + "</td></tr>");

            $("#output").html(output);

        }

    });

};
btnSaveDb.addEventListener('click',OnSubmit)
btnAddMore.addEventListener('click',fnAddItems)
txtprice.addEventListener('change',fnCalculateItemTotal)
txtquantity.addEventListener('change', fnCalculateItemTotal)
