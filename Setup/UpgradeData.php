<?php

namespace Extait\W3W\Setup;

use Magento\Framework\Setup\UpgradeDataInterface;
use Magento\Eav\Setup\EavSetup;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Customer\Setup\CustomerSetupFactory;

class UpgradeData implements UpgradeDataInterface
{
    /**
     * EAV setup factory
     *
     * @var EavSetupFactory
     */
    protected $_eavSetupFactory;

    /**
     * EAV setup factory
     *
     * @var CustomerSetupFactory
     */
    protected $_customerSetupFactory;

    public function __construct(
        EavSetupFactory $eavSetupFactory,
        CustomerSetupFactory $customerSetupFactory
    )
    {
        $this->_eavSetupFactory = $eavSetupFactory;
        $this->_customerSetupFactory = $customerSetupFactory;
    }

    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $dbVersion = $context->getVersion();
        /** @var EavSetup $eavSetup */

        if (version_compare($dbVersion, '0.0.2', '<')) {
            $eavSetup = $this->_customerSetupFactory->create(['setup' => $setup]);
            $eavSetup->addAttribute('customer_address', 'w3w', [
                'type' => 'varchar',
                'input' => 'text',
                'label' => 'What3Words',
                'global' => 1,
                'visible' => 1,
                'required' => false,
                'user_defined' => false,
                'system'=>0,
                'group'=>'General',
                'visible_on_front' => 1,
                'sort_order' => 888,
                'position' => 888,
            ]);
            $eavSetup->getEavConfig()->getAttribute('customer_address','w3w')
                ->setUsedInForms(['adminhtml_customer_address','customer_address_edit','customer_register_address'])
                ->save();
        }
    }
}
