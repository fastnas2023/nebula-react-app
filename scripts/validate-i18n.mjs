import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

const flattenKeys = (obj, prefix = '') => {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...flattenKeys(v, next));
    } else {
      keys.push(next);
    }
  }
  return keys;
};

const enPath = path.join(root, 'src', 'locales', 'en', 'translation.json');
const zhPath = path.join(root, 'src', 'locales', 'zh', 'translation.json');

const en = readJson(enPath);
const zh = readJson(zhPath);

const enKeys = new Set(flattenKeys(en));
const zhKeys = new Set(flattenKeys(zh));

const requiredKeys = [
  'login.returnToOrbit',
  'login.authenticate',
  'login.subtitle',
  'login.operatorId',
  'login.emailPlaceholder',
  'login.passkey',
  'login.lostKey',
  'login.establishing',
  'login.initializeConnection',
  'login.newToNetwork',
  'login.requestAccess',
  'login.encryptedSession',
  'sidebar.expandSidebar',
  'sidebar.collapseSidebar',
  'sidebar.switchToEnglish',
  'sidebar.switchToChinese',
  'sidebar.proPlan',
  'sidebar.myProfile',
  'sidebar.billingAndPlan',
  'sidebar.signOut',
  'dashboard.searchPlaceholder',
  'dashboard.meetingSummary',
  'dashboard.viewAll',
  'setup.backToHome',
  'setup.virtualBackground',
  'setup.advancedSettings',
  'setup.features.hdVideo',
  'setup.features.aiNoiseCancellation',
  'setup.cameraOff',
  'setup.devices.cameraBuiltIn',
  'setup.devices.cameraLogitech',
  'setup.devices.micMacBook',
  'setup.devices.micShure',
  'setup.networkLatency',
  'meeting.joinedMeeting',
  'meeting.roomIdLabel',
  'meeting.aiActionSummarize',
  'meeting.aiActionItems',
  'meeting.leaveMeetingTitle',
  'meeting.leaveMeetingDesc',
  'meeting.cancelBtn',
  'meeting.confirmLeaveBtn',
  'meeting.participants',
  'screenshare.viewAsParticipant',
  'screenshare.viewAsPresenter',
  'screenshare.doubleClickToFullscreen',
  'screenshare.doubleClickToExit',
  'screenshare.theaterMode',
  'screenshare.exitTheaterMode',
  'screenshare.osFullscreen',
  'screenshare.exitOsFullscreen',
  'screenshare.infiniteMirrorDetected',
  'screenshare.infiniteMirrorWarning',
  'screenshare.ignore',
  'screenshare.stopSharing',
  'screenshare.speaking',
  'screenshare.sharedScreenAlt',
  'screenshare.leaveMeetingTitle',
  'screenshare.leaveMeetingConfirm',
  'screenshare.cancel',
  'screenshare.yesLeave',
  'annotation.clearCanvas',
  'annotation.close',
  'schedule.inviteesLabel',
  'schedule.inviteesPlaceholder',
  'schedule.timezoneOptions.pst',
  'schedule.timezoneOptions.est',
  'schedule.timezoneOptions.utc',
  'schedule.admitGuestsManually',
  'schedule.pinRequired',
  'schedule.advancedTitle',
  'schedule.hostVideoOn',
  'schedule.hostVideoDesc',
  'schedule.autoRecord',
  'schedule.autoRecordDesc',
  'invite.namePlaceholder',
  'invite.e2eEncrypted',
  'settings.title',
  'settings.subtitle',
  'settings.camera',
  'settings.device',
  'settings.changeBackground',
  'settings.mirrorVideo',
  'settings.mirrorVideoDesc',
  'settings.audio',
  'settings.microphone',
  'settings.noiseCancellation',
  'settings.noiseCancellationDesc',
  'settings.discardChanges',
  'settings.saveSettings',
  'profile.title',
  'profile.subtitle',
  'profile.update',
  'profile.activeNode',
  'profile.myMeetingQr',
  'profile.copyP2pLink',
  'profile.proPlan',
  'profile.billedAnnually',
  'profile.manageBilling',
  'profile.identity',
  'profile.firstName',
  'profile.lastName',
  'profile.operatorEmailReadOnly',
  'profile.timezone',
  'profile.personalMeetingId',
  'profile.discard',
  'profile.saveChanges',
  'profile.dangerZone',
  'profile.dangerZoneDesc',
  'profile.regenerateKeys',
  'profile.invalidateLinks',
  'profile.rotateKeys',
  'profile.deleteAccount',
  'profile.deleteAccountDesc',
  'profile.delete',
  'contacts.title',
  'contacts.subtitle',
  'contacts.addConnection',
  'contacts.searchPlaceholder',
  'recording.share',
  'recording.downloadMp4',
  'recording.aiSummary',
  'recording.transcript',
  'recording.executiveSummary',
  'recording.actionItems',
  'recording.keyMoments',
  'recording.participantsSummary',
  'whiteboard.collaborating',
  'whiteboard.closeBoard',
  'whiteboard.minimap',
  'whiteboard.mockTitle',
  'whiteboard.mockNote1Topic',
  'whiteboard.mockNote1Desc',
  'whiteboard.mockNote2Topic',
  'whiteboard.mockNote2Desc',
  'whiteboard.mockCursorLabel',
  'designSystem.badge',
  'designSystem.title',
  'designSystem.subtitle',
  'designSystem.foundations',
  'designSystem.coreComponents',
  'designSystem.pageArchetypes',
  'designSystem.typographyScale',
  'designSystem.colorPalette',
  'designSystem.buttons',
  'designSystem.formControls',
  'designSystem.cardsSurfaces',
  'designSystem.primaryAction',
  'designSystem.secondaryGhost',
  'designSystem.destructiveAction',
  'designSystem.emailLabel',
  'designSystem.emailPlaceholder',
  'designSystem.searchLabel',
  'designSystem.searchPlaceholder',
  'designSystem.globalLatency',
  'designSystem.engineering',
  'designSystem.heroLayout',
  'designSystem.listLayout',
  'designSystem.detailLayout',
  'designSystem.live',
  'recording.mockTitle',
  'recording.mockSubtitle',
  'recording.mockSummaryDesc',
  'recording.mockAction1Title',
  'recording.mockAction1Desc',
  'recording.mockAction2Title',
  'recording.mockAction2Desc',
  'recording.mockMoment1Title',
  'recording.mockMoment2Title',
  'recording.mockMoment3Title'
];

const missing = (set, list) => list.filter((k) => !set.has(k));

const missingEn = missing(enKeys, requiredKeys);
const missingZh = missing(zhKeys, requiredKeys);

if (missingEn.length || missingZh.length) {
  if (missingEn.length) {
    console.error('Missing keys in EN:');
    for (const k of missingEn) console.error(`- ${k}`);
  }
  if (missingZh.length) {
    console.error('Missing keys in ZH:');
    for (const k of missingZh) console.error(`- ${k}`);
  }
  process.exit(1);
}

const enOnly = [...enKeys].filter((k) => !zhKeys.has(k));
const zhOnly = [...zhKeys].filter((k) => !enKeys.has(k));

if (enOnly.length || zhOnly.length) {
  if (enOnly.length) {
    console.error('Keys only in EN:');
    for (const k of enOnly) console.error(`- ${k}`);
  }
  if (zhOnly.length) {
    console.error('Keys only in ZH:');
    for (const k of zhOnly) console.error(`- ${k}`);
  }
  process.exit(1);
}

console.log('i18n validation OK');
