class FakeFirestore {
    collection (name){
        this.currentCollection = name;
        return this
    }
    where(){
return this;
    }
    add(){
        return this;
    }
    get(){
        return "abcd"
    }
    limit (){

    }
    orderBy(){

    }
    then(){

    }
    update(){

    }

}


disable botão editar