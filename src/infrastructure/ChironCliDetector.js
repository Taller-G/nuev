const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');

const ChironCliGateway = require('../application/ChironCliGateway');

const NOT_INSTALLED = Object.freeze({
    version: 'not_installed',
    channel: null,
    installed_at: null,
    source: 'none'
});

// Same shape the installers accept for `chiron --version` output:
// plain semver with an optional prerelease suffix (0.14.0-dev.1).
const SEMVER_RE = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

class ChironCliDetector extends ChironCliGateway {
    async getCliInfo() {
        const fromManifest = this.readManifest();
        if (fromManifest) {
            return fromManifest;
        }
        return this.execCliVersion();
    }

    // The installers respect CHIRON_HOME as the ~/.chiron override, so the
    // detector must look in the same place.
    chironHome() {
        return process.env.CHIRON_HOME || path.join(os.homedir(), '.chiron');
    }

    readManifest() {
        try {
            const raw = fs.readFileSync(path.join(this.chironHome(), 'manifest.json'), 'utf8');
            const manifest = JSON.parse(raw);
            if (
                typeof manifest.version !== 'string' || manifest.version === '' ||
                typeof manifest.channel !== 'string' || manifest.channel === '' ||
                typeof manifest.installed_at !== 'string' || manifest.installed_at === ''
            ) {
                return null;
            }
            return {
                version: manifest.version,
                channel: manifest.channel,
                installed_at: manifest.installed_at,
                source: 'manifest'
            };
        } catch (err) {
            return null;
        }
    }

    // install.sh / install.ps1 record the channel in ~/.chiron/cli/channel;
    // it is the only channel source when the manifest is unavailable.
    readChannelFile() {
        try {
            const channel = fs.readFileSync(path.join(this.chironHome(), 'cli', 'channel'), 'utf8').trim();
            return channel || null;
        } catch (err) {
            return null;
        }
    }

    execCliVersion() {
        return new Promise((resolve) => {
            execFile('chiron', ['--version'], { timeout: 5000 }, (err, stdout) => {
                if (err) {
                    resolve(NOT_INSTALLED);
                    return;
                }
                const version = String(stdout).split('\n')[0].trim();
                if (!SEMVER_RE.test(version)) {
                    resolve(NOT_INSTALLED);
                    return;
                }
                resolve({
                    version,
                    channel: this.readChannelFile(),
                    installed_at: null,
                    source: 'cli_exec'
                });
            });
        });
    }
}

module.exports = ChironCliDetector;
