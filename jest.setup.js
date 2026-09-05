const {configure} = require('@testing-library/react-native');

// CI runners are slow; give async queries more room than the 1 s default.
configure({asyncUtilTimeout: 5000});
