import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue2';

export default {
    input: 'src/main.js',
    output: {
        file: 'lib/bundle.js',
        format: 'cjs',
        name: 'apis'
    },
    plugins: [
        babel(
            {
                exclude: ['node_modules/**']
            }
        ),
        vue()
    ]
}
