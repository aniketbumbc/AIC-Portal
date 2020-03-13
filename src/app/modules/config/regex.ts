export const regex:any = {
    email_regex_for_allowed_domain : '^[a-zA-Z0-9_\.\-]+@(accionlabs\.com|parinati\.in|accionlabs\.net|reach1to1\.com|motifworks\.com|i2sbs\.com|gmail\.com)',
    regex_for_password : '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$',
    regex_title : '^([A-Za-z0-9\-\_, ]+)$',
    regex_url : '(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))',
    regex_name : '^[a-zA-Z ]+$',
    regex_urlLink:"^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
};