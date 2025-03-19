const ItemType = {
  SMALL_AMMO: "smallAmmo",
  MEDIUM_AMMO: "mediumAmmo",
  BIG_AMMO: "bigAmmo",
  SHIELD: "shield",
  SUPERBALL: "superball"
}

class Items{
    constructor(type) {
        this.type = type;
    }

    getTime(){
      switch (this.type) {
        case ItemType.SMALL_AMMO: return loadImage("small_ammo.png");
        case ItemType.MEDIUM_AMMO: return loadImage("medium_ammo.png");
        case ItemType.BIG_AMMO: return loadImage("big_ammo.png");
        case ItemType.SHIELD: return 5000
        case ItemType.SUPERBALL: return 7000
        
        default: return null;
      }
    }
    getImage() {
        switch (this.type) {
          case ItemType.SMALL_AMMO: return loadImage("small_ammo.png");
          case ItemType.MEDIUM_AMMO: return loadImage("medium_ammo.png");
          case ItemType.BIG_AMMO: return loadImage("big_ammo.png");
          case ItemType.SHIELD: return shieldSprite;
          case ItemType.SUPERBALL: return superballImage
          
          default: return null;
        }
    }

    display(x, y){
      image(this.getImage(), x, y)
    }

    
}