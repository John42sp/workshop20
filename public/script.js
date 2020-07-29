// document.querySelector("button.fat")        //toogle footer
// .addEventListener('click', function(){      //função sem nome, faz amesma coisa que função onOff
//     document.querySelector("footer")        //clicar no button.fat = o footer (selecionado) é escondido
//     .classList
//     .toggle("hide")
// })

//MESMA COISA, COM FUNÇÃO ONOFF()
// function onOff(){                          //função onOff disparada com click no botão c/ onclick="onOff()"
//     document.querySelector("footer")
//     .classList
//     .toggle("hide")
// }

// document.querySelector("button.fat")        //toogle footer
// .addEventListener('click', onOff)

function onOff() {                          //função onOff disparada com click no botão c/ onclick="onOff()"
    document.querySelector("#modal")
    .classList
    .toggle("hide")

    document.querySelector("body")
    .classList
    .toggle("hideScroll")

    document.querySelector("#modal")
    .classList
    .toggle("addScroll")
}

//sempre fazer validação no frontend e backend, especialmente no backend. 
//VALIDAÇÃO NO FRONT-END DE PREENCHIMENTO DE TODOS CAMPOS. sE TODOS PREENCHIDOS, ELA NÃO FARÁ NADA
function checkFields(event) {
    //para mostrar preenchimento no inspect dev tools e se preenchimento tem valor p tomar uma decisão
   // console.log(event.target.title.value)  ou
    //console.log(event.target["title"].value) 

    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link"
    ]
    //FORMA MAIS SIMPLES
    //for( let value of valuesToCheck ) {      //[value] = variavel assimindo valor de todos inputs
        //console.log(event.target[value].value) teste no console.log se estão funcionando
    //}
    
    //FORMA MAIS AVANÇADA
    // console.log(typeof event.target["title"].value)    
    // console.log(typeof event.target["title"].value === "string")

    // console.log(!event.target["title"].value.trim()) -> se campo input estiver vazio, será true no inspect    
    //The NOT operator (!) returns true for false statements and false for true statements = INVERTE O FEEDBACK
    const isEmpty = valuesToCheck.find(function(value) { //metodo find irá percorrer todos valores do valuesToCheck
        //== means equal value, === means equal type
        const checkIfString = typeof event.target[value].value === "string";

        //se o campo (value) estiver em branco, ! retorna TRUE. Se apenas houver espaços, trim fará seu trabalho.
        const checkIfIsEmpty = !event.target[value].value.trim(); 
        if(checkIfString && checkIfIsEmpty) {  //ambas precisam retornar TRUE para bloco prosseguir.
            return true
        }      
    })
     console.log(isEmpty); //indicará no inspect qual dos valores está vazio, se não , undefined.
        // if(isEmpty) {
        //     event.preventDefault(); //fazer o app parar, não prosseguir, como modo padrão
        //     alert('Favor preencher todos campos do form.')
        // }

}