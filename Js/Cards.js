import { Services } from "./Services.js";
export class Cards {    
    constructor(){
        try {
            console.log("dasdasd");
            this.services = new Services();
            this.pokemonContainer = document.querySelector('.pokemon-container');
            this.spinner = document.querySelector("#spinner");
            this.previus = document.querySelector("#previus");
            this.next = document.querySelector("#next");
            this.offset = 1;
            this.limit = 8;
            this.addEvents();
            this.fetchpokemons();
        } catch (error) {
            console.log(error);
        }

    }

    addEvents () {
        try{
            this.previus.addEventListener("click", () => {
                if(this.offset != 1){
                    this.offset -= 9;
                    this.removeChildNodes(this.pokemonContainer);
                    this.fetchpokemons();
                }
            });
            this.next.addEventListener("click", () => {
                this.offset += 9;
                this.removeChildNodes(this.pokemonContainer);
                this.fetchpokemons();
            });
        } catch (e) {
            console.log(e);
        }
    }
    
    fetchpokemon(id) {
        this.services.fetchpokemon(id)
        .then(res=>res.json())
        .then(data => {
            this.createPokemon(data);
            console.log(data);
            spinner.style.display = 'none';
        })
    }
    fetchpokemons() {
        spinner.style.display = 'block';
        for (let i = this.offset; i <= this.offset + this.limit; i++) { 
            this.fetchpokemon(i);
        }
    }
    createPokemon(pokemon){
        const flipCard = document.createElement("div");
        flipCard.classList.add("flip-card");
      
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
      
        flipCard.appendChild(cardContainer);
      
        const card = document.createElement("div");
        card.classList.add("pokemon-block");
      
        const spriteContainer = document.createElement("div");
        spriteContainer.classList.add("img-container");
      
        const sprite = document.createElement("img");
        sprite.src = pokemon.sprites.front_default;
      
        spriteContainer.appendChild(sprite);
      
        const number = document.createElement("p");
        number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
      
        const name = document.createElement("p");
        name.classList.add("name");
        name.textContent = pokemon.name;
      
        card.appendChild(spriteContainer);
        card.appendChild(number);
        card.appendChild(name);
      
        const cardBack = document.createElement("div");
        cardBack.classList.add("pokemon-block-back");
      
        cardBack.appendChild(this.progressBars(pokemon.stats));
      
        cardContainer.appendChild(card);
        cardContainer.appendChild(cardBack);
        this.pokemonContainer.appendChild(flipCard);
    }
    
    progressBars(stats) {
        const statsContainer = document.createElement("div");
      statsContainer.classList.add("stats-container");
    
      for (let i = 0; i < 4; i++) {
        const stat = stats[i];
        const statPercent = stat.base_stat / 2 + "%";
        const statContainer = document.createElement("div");
        statContainer.classList.add("stat-container");
    
        const statName = document.createElement("div");
        statName.textContent = stat.stat.name;
    
        const progress = document.createElement("div");
        progress.classList.add("progress");
    
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 100);
        progressBar.style.width = statPercent;
    
        progressBar.textContent = stat.base_stat;
    
        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
    
        statsContainer.appendChild(statContainer);
      }
    
      return statsContainer;
    }
    
    removeChildNodes(parent) {
        while (parent.firstChild){
            parent.removeChild(parent.firstChild)
        }
    }
}
const cards = new Cards();