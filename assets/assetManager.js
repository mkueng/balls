class AssetManager{

  #images = {};
  #sounds = {};
  #fonts = {};

  constructor(){

  }

  loadImage(name){
    this.#images[name] = loadImage('assets/images/'+name+'.png');
  }

  getImage(name){
    return this.#images[name];
  }
}