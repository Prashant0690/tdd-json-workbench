// You can put this function in a helper file.
export const importFromJsonFile = async (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
        fileReader.readAsText(file);
    });
};
