module.exports = {
    esubStore: {
        output: {
            mode: 'tags-split',
            target: 'src/app/common/services/generated/raportaStore.ts',
            schemas: 'src/app/common/types/generated',
            client: 'angular',
            mock: true,
            prettier: true,
            clean: true,
        },
        input: {
            target: './scripts/generateApi/schema.json',
        },
    },
};
