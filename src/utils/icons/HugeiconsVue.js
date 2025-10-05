import { h } from 'vue';
import { Icon } from '@iconify/vue';
import iconsJson from '@iconify-json/hugeicons/icons.json';

const HugeiconsVue = {};

console.log('Initializing HugeiconsVue');
console.log('Available icons:', Object.keys(iconsJson.icons).length);

for (const iconName in iconsJson.icons) {
    if (iconsJson.icons.hasOwnProperty(iconName)) {
        const PascalCaseName = iconName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');

        HugeiconsVue[PascalCaseName] = {
            name: PascalCaseName,
            render() {
                return h(Icon, { icon: `hugeicons:${iconName}` });
            }
        };
    }
}

console.log('Registered icons:', Object.keys(HugeiconsVue).length);


export default HugeiconsVue;