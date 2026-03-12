Hooks.once("item-piles-ready", async () => {
  const baseConfig = {
    ACTOR_CLASS_TYPE: "npc",
    ITEM_CLASS_LOOT_TYPE: "item",
    ITEM_CLASS_WEAPON_TYPE: "weapon",
    ITEM_CLASS_EQUIPMENT_TYPE: "armour",

    ITEM_QUANTITY_ATTRIBUTE: "system.quantity",
    ITEM_PRICE_ATTRIBUTE: "system.cost",

    ITEM_FILTERS: [
      {
        path: "type",
        filters: "associate,term,worlddata"
      },
      {
        path: "system.weapon.skill",
        filters: "melee.natural"
      }
    ],

    ITEM_SIMILARITIES: ["name", "type"],

    CURRENCIES: [
      {
        type: "attribute",
        name: "Credits",
        img: "",
        abbreviation: "{#}Cr",
        data: {
          path: "system.finance.cash"
        },
        primary: true,
        exchangeRate: 1
      }
    ],

    ITEM_COST_TRANSFORMER: (item) => {
      return Number(foundry.utils.getProperty(item, "system.cost")) || 0;
    }
  };

  const VERSIONS = {
    "5.0.0": {
      ...baseConfig,
      VERSION: "1.0.10",
      ITEM_SIMILARITIES: ["name", "type", "system.container"],
      UNSTACKABLE_ITEM_TYPES: ["container"]
    }
  };

  for (const [version, data] of Object.entries(VERSIONS)) {
    await game.itempiles.API.addSystemIntegration(data, version);
  }
});
