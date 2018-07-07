<?php

namespace Extait\W3W\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Store\Model\ScopeInterface;

/**
 * Class Data
 * @package Extait\W3W\Helper
 */
class Data extends AbstractHelper
{
    /**
     * Config XML paths.
     */
    const W3W_API_KEY = 'extait_w3w/general/w3w_api_key';
    const GOOGLE_API_KEY = 'extait_w3w/general/google_api_key';

    /**
     * @return mixed
     */
    public function getW3wApiKey()
    {
        return $this->scopeConfig->getValue(
            self::W3W_API_KEY,
            ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * @return mixed
     */
    public function getGoogleApiKey()
    {
        return $this->scopeConfig->getValue(
            self::GOOGLE_API_KEY,
            ScopeInterface::SCOPE_STORE
        );
    }
}
