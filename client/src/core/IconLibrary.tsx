/**
 * Library for all icons used in library
 * Only icons explicitly imported will be used in application
 *
 * To import an entire library:
 * import brands from '@fortawesome/fontawesome-free-brands'
 * fontawesome.library.add(brands);
 *
 *
 */

import * as fontawesome from '@fortawesome/fontawesome-svg-core';
import * as faBitcoin from '@fortawesome/free-brands-svg-icons/faBitcoin';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    init: () => fontawesome.library.add(
        faBitcoin.definition,
    )
};