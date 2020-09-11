import {__} from '@wordpress/i18n'
import {addFilter} from '@wordpress/hooks'
import {InspectorAdvancedControls, ToggleControl} from '@wordpress/components'

const withAdvancedControls = createHigherOrderComponent(BlockEdit => ({isSelected}) => (
  <>
    <BlockEdit {...props} />

    {isSelected && (
      <InspectorAdvancedControls>
        <ToggleControl
          label={__('Remove Bottom Margin')}
          checked={true}
        />
      </InspectorAdvancedControls>
    )}
  </>
, 'withAdvancedControls'))

addFilter(
  'editor.BlockEdit',
  'controls',
  withAdvancedControls,
)
