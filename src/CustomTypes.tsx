type itemObjType = {
    hash: number;
    bucketHash: number;
    tableId: string;
    name: string;
    icon: string;
    flavorText: string;
    rarity: string;
    itemType: string;
    bucket: string;
    equipped: boolean;
  };
  type itemArrayType = itemObjType[];
  type characterObjType = {
    kineticWeapons: itemArrayType;
    energyWeapons: itemArrayType;
    heavyWeapons: itemArrayType;
    helmet: itemArrayType;
    arms: itemArrayType;
    chest: itemArrayType;
    legs: itemArrayType;
    classItem: itemArrayType;
    ghost: itemArrayType;
    // banner: itemArrayType;
    emblem: itemArrayType;
    ship: itemArrayType;
    sparrow: itemArrayType;
    // emotes: itemArrayType;
    inventory: itemArrayType;
    subclass: itemArrayType;
  };
  // type itemArrayType = [itemObjType];
  type dataStateType = {
    [propName: string]: {
      raceType: string;
      raceHash: string;
      classType: string;
      classHash: string;
      race: string;
      class: string;
      emblemBackgroundPath: string;
      characterObj: {
        kineticWeapons: itemArrayType;
        energyWeapons: itemArrayType;
        heavyWeapons: itemArrayType;
        helmet: itemArrayType;
        arms: itemArrayType;
        chest: itemArrayType;
        legs: itemArrayType;
        classItem: itemArrayType;
        ghost: itemArrayType;
        // banner: itemArrayType;
        emblem: itemArrayType;
        ship: itemArrayType;
        sparrow: itemArrayType;
        // emotes: itemArrayType;
        inventory: itemArrayType;
        subclass: itemArrayType;
      };
    };
  };

  export { type itemObjType, type itemArrayType, type characterObjType, type dataStateType};