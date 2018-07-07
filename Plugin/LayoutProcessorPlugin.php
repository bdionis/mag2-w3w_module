<?php
/**
 * Created by PhpStorm.
 * User: bondarchuk
 * Date: 06.07.18
 * Time: 15:37
 */

namespace Extait\W3W\Plugin;


/**
 * Class LayoutProcessorPlugin
 * @package Extait\W3W\Plugin
 */
class LayoutProcessorPlugin
{
    /**
     * Adding w3w field
     */
    public function afterProcess(\Magento\Checkout\Block\Checkout\LayoutProcessor $subject, array $jsLayout)
    {
        $customAttributeCode = 'w3w';
        $customField = [
            'component' => 'Magento_Ui/js/form/element/abstract',
            'config' => [
                'customScope' => 'shippingAddress.custom_attributes',
                'customEntry' => null,
                'template' => 'ui/form/field',
                'elementTmpl' => 'Extait_W3W/form/element/w3winput',
            ],
            'dataScope' => 'shippingAddress.custom_attributes' . '.' . $customAttributeCode,
            'label' => 'What3Words',
            'provider' => 'checkoutProvider',
            'sortOrder' => 0,
            'validation' => [
                'required-entry' => false
            ],
            'options' => [],
            'filterBy' => null,
            'customEntry' => null,
            'visible' => true,
        ];

        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset']['children'][$customAttributeCode] = $customField;

        return $jsLayout;
    }
}
