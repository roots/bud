import { build } from "../build";
import { renderCompilerDashboard } from "./renderCompilerDashboard";
import { compileSafeMode } from "./renderSafeMode";
import type { Bud } from "./types";
import type { WebpackConfig } from "./types";

/**
 * Compiler
 */
const compiler = (bud: Bud): void => {
  /**
   * Use bud's default dashboard when enabled
   */
  const dashboardEnabled: boolean = bud.state.features.dashboard;

  /**
   * Dump config to stdout close process before build when enabled
   */
  const dumpEnabled: boolean = bud.state.features.dump;

  /**
   * Pre-configuration hook
   */
  bud.hooks.call("pre_config", bud);

  /**
   * webpack configuration
   */
  const compiledConfig: WebpackConfig = build(bud).makeConfig();

  /**
   * Post-configuration hook (finalizes webpack configuration)
   */
  bud.hooks.call("post_config", compiledConfig);

  /**
   * Dump if dumpEnabled conditional check is true
   */
  dumpEnabled && bud.util.dump(compiledConfig);

  /**
   * Run compiler.
   */
  dashboardEnabled
    ? renderCompilerDashboard(bud, compiledConfig) // enabled: bud compiler
    : compileSafeMode(bud, compiledConfig); // disabled: more standard stats output
};

export { compiler };
