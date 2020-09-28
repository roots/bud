import Bud from '@roots/bud-types';
export default class extends Bud {
    constructor();
    /**
     * @todo updateDisk / file watcher solution
     */
    updateDisk: Bud['updateDisk'];
    makePluginController: Bud['makePluginController'];
}
