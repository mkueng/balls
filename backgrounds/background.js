class Background{
  #image;
  #posX;
  #posY;
  #scale;

    constructor({
        image,
        posX,
        posY,
      scale
                }){
        this.#image = image;
        this.posX = posX;
        this.posY = posY;
        this.#scale = Math.max(width / image.width, height / image.height);;
    }




    draw(){
        push();
      imageMode(CENTER);

      image(
       this.#image,
        width / 2,
        height / 2,
        this.#image.width * this.#scale,
        this.#image.height * this.#scale
      );
        pop();
    }

}