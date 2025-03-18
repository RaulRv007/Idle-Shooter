const ItemType = {
    SMALL_AMMO: "smallAmmo",
    MEDIUM_AMMO: "mediumAmmo",
    BIG_AMMO: "bigAmmo",
    SHIELD: "shield"
  }

class Items{
    constructor(type) {
        this.type = type;
    }
    getImage() {
        switch (this.type) {
          case ItemType.SMALL_AMMO: return loadImage("small_ammo.png");
          case ItemType.MEDIUM_AMMO: return loadImage("medium_ammo.png");
          case ItemType.BIG_AMMO: return loadImage("big_ammo.png");
          case ItemType.SHIELD: return shieldSprite;
          default: return null;
        }
    }
    getDescription(){
        switch (this.type) {
            case ItemType.SMALL_AMMO: return "asdf";
            case ItemType.MEDIUM_AMMO: return "asdfjklñlkj";
            case ItemType.BIG_AMMO: return "asdjfklñlkj";
            case ItemType.SHIELD: return "asdfjklñlkjasdf";
            default: return null;
          }
    }
    getTime(){
        switch (this.type) {
            case ItemType.SMALL_AMMO: return 5;
            case ItemType.MEDIUM_AMMO: return 5;
            case ItemType.BIG_AMMO: return 5;
            case ItemType.SHIELD: return 5;
            default: return null;
          }
    }
    display(x, y){
      image(this.getImage(), x, y)
    }

    
}