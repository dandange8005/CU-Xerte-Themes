/**
 * --------------------------------------------------------------------------
 * Custom JavaScript for the Bootstrap theme 
 * --------------------------------------------------------------------------
 */

// path: js/bootstrap.js

// Remove empty p tags that contains &nbsp;

jQuery('p:contains("\u00A0")').remove();
