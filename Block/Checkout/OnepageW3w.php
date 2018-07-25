<?php

namespace Extait\W3W\Block\Checkout;

use Magento\Checkout\Block\Onepage;
use Extait\W3W\Helper\Data;

/**
 * Class OnepageW3w
 * @package Extait\W3W\Block\Checkout
 */
class OnepageW3w extends Onepage
{
    /** @var Data */
    protected $_w3w_helper;

    /**
     * OnepageW3w constructor.
     * @param \Magento\Framework\View\Element\Template\Context $context
     * @param \Magento\Framework\Data\Form\FormKey $formKey
     * @param \Magento\Checkout\Model\CompositeConfigProvider $configProvider
     * @param array $layoutProcessors
     * @param array $data
     * @param \Magento\Framework\Serialize\Serializer\Json|null $serializer
     * @param Data $w3w_helper
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Framework\Data\Form\FormKey $formKey,
        \Magento\Checkout\Model\CompositeConfigProvider $configProvider,
        array $layoutProcessors = [],
        array $data = [],
        \Magento\Framework\Serialize\Serializer\Json $serializer = null,
        Data $w3w_helper
    ) {
        parent::__construct($context, $formKey, $configProvider, $layoutProcessors, $data, $serializer);
        $this->_w3w_helper = $w3w_helper;
    }

    /**
     * @return mixed
     */
    public function getGoogleApiKey()
    {
        return $this->_w3w_helper->getGoogleApiKey();
    }
}
