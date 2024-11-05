import {CaretSortIcon} from '@radix-ui/react-icons';
import {type Meta, type StoryObj} from '@storybook/react';

import {Button} from '@/primitives/button';

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '.';

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args} className='w-[350px] space-y-2'>
      <div className='flex items-center justify-between space-x-4 px-4'>
        <h4 className='text-sm font-semibold'>
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='sm'>
            <CaretSortIcon className='size-4' />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className='rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
        @radix-ui/primitives
      </div>
      <CollapsibleContent className='space-y-2'>
        <div className='rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
          @radix-ui/colors
        </div>
        <div className='rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
