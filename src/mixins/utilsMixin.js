export const utilsMixin = {
    methods: {
        // https://stackoverflow.com/questions/60304208/javascript-algorithm-to-generate-all-possible-unique-combinations-of-any-length
        getAllCombinations(array) {
            function iter(temp, index) {
                if (index >= array.length) {
                    result.push(temp);
                    return;
                }

                iter([...temp, array[index]], index + 1);
                iter(temp, index + 1);
            }

            var result = [];
            iter([], 0);
            return result;
        },
    }
}