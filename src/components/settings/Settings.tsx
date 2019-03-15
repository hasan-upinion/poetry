import { useContext, useEffect } from 'react';
import detectRtl from 'rtl-detect';
import { rootContext } from '../../store';

export interface SettingsProps {}

const Settings: React.SFC<SettingsProps> = () => {
    const rootStore = useContext(rootContext);
    useEffect(() => {
        const language = window.navigator.language;
        const isRtl = detectRtl.isRtlLang(language);
        rootStore.settings.setIsRtl(isRtl);
    }, []);
    return null;
};

export default Settings;
