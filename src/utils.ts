

// writeJson is a helper function to write a JSON object to a file.
export async function writeJson<T>(filePath: string, data: T) {
    try {
        await Deno.writeTextFile(filePath, JSON.stringify(data, null, 2));
    } catch (e) {
        console.log(filePath + ': ' + e.message);
    }
}