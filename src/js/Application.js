import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
    this._loading = document.querySelector(".progress");

    this._load()
    .then(data => {
      console.log(data)
    })

    this.emit(Application.events.READY);
  }

  async _load(){ 
    // Fetch from all pages https://swapi.boom.dev/api/planets?page=
    let pageNumber = 1;

    this._startLoading();

    try {
      let responce = await fetch(`https://swapi.boom.dev/api/planets?page=${pageNumber}`)
      if(responce.status === 200){
        this._stopLoading();
        return await responce.json();
      }
      throw new Error("Can't fetch resource!");
    }
    catch(err){
        console.error(err.message)
    }
    finally {
      this._stopLoading();  
    }
  }

  _startLoading(){
    this._loading.hidden = true
  }

  _stopLoading(){

  }

  _create(){
    // For rendering of boxes (planets)
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = this._render({
      name: "Placeholder",
      terrain: "placeholder",
      population: 0,
    });

    document.body.querySelector(".main").appendChild(box);
  }
  
  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
