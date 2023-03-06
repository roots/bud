import { RichTextToolbarButton } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';

export const name = `example/underline`;
export const title = `Underline`;
export const tagName = `u`;
export const className = null;

export const edit = ({ isActive, onChange, value }) => (
  <RichTextToolbarButton
    icon="editor-underline"
    title="Underline"
    isDisabled
    onClick={() =>
      onChange(
        toggleFormat(value, {
          type: name,
        })
      )
    }
    isActive={isActive}
  />
);
