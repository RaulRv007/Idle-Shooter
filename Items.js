const ItemType = {
  SMALL_AMMO: "smallAmmo",
  MEDIUM_AMMO: "mediumAmmo",
  BIG_AMMO: "bigAmmo",
  SHIELD: "shield",
  SUPERBALL: "superball",
  TRIPLE_SHOOT: "3shoot",
  ANGLED_SHOOT: "angledShoot"
}

class Items{
    constructor(type) {
        this.type = type;
    }

    getTime(){
      switch (this.type) {
        case ItemType.SHIELD: return 5000
        case ItemType.SUPERBALL: return 7000
        case ItemType.TRIPLE_SHOOT: return 10000
        case ItemType.ANGLED_SHOOT: return 10000
        
        default: return null;
      }
    }
    getImage() {
        switch (this.type) {
          case ItemType.SMALL_AMMO: return smallAmmoSprite;
          case ItemType.MEDIUM_AMMO: return mediumAmmoSprite;
          case ItemType.BIG_AMMO: return bigAmmoSprite;
          case ItemType.SHIELD: return shieldSprite;
          case ItemType.SUPERBALL: return superballImage
          case ItemType.TRIPLE_SHOOT: return tripleShootSprite
          case ItemType.ANGLED_SHOOT: return angledShootSprite
          
          default: return null;
        }
    }

    display(x, y){
      image(this.getImage(), x, y)
    }

    
}