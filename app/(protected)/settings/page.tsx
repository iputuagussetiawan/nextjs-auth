import ProfileSetting from "../_components/profile-setting"
import { currentUser } from '@/lib/auth';
import React from 'react'

const SettingPage = async() => {
    const user = await currentUser();
    return (
        <ProfileSetting user={user} />
    )
}

export default SettingPage