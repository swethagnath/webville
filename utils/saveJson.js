const fs = require("fs");

const save = () => {
    fs.writeFile(
        "./usStates.json",
        JSON.stringify(usStates, null, 2),
        (error) => {
            if (error) {
                throw error;
            }
        }
    );
};

module.exports = {
    save
};
