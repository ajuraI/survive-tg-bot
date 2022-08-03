const commands = {
    CMD_START: "/start",
    CMD_RANDOM: "/random",
    CMD_CLEAR: "/clear",
    CMD_CURRENT: "/current",
    CMD_UPDATE: "/update",
    CMD_RANDOMCAT: "/randomcat",
    CMD_SPECIAL: "/special",
};

const VALUE = "Значения";

const tables = {
    profession: "Профессия",
    "experience*": "Стаж работы",
    "bio*": "Биология",
    "age*": "Возрастные стадии",
    hobby: "Хобби",
    "hobby_level*": "Уровень владением хобби",
    health: "Здоровье",
    "disease_stage*": "Степень заболевания",
    phobic: "Фобия",
    add_info: "Доп. Информация",
    small_bag: "Малый багаж",
    big_bag: "Большой багаж",
};

module.exports = {
    commands,
    tables,
    VALUE,
}
