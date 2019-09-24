import * as fs from 'fs'
import * as fsExtra from 'fs-extra'
import * as path from 'path'

const userFuseDir = process.env.FUSEBOX_DIST_ROOT || path.resolve(__dirname)
const stylesheetExtensions = new Set<string>(['.css', '.sass', '.scss', '.styl', '.less', '.pcss'])

// tslint:disable-next-line: interface-name
export interface Concat {
    content: Buffer
    sourceMap: string
    add(fileName: string | null, content: string | Buffer, sourceMap?: string): void
}
export type ConcatModule = new (generateSourceMap: boolean, outputFileName: string, seperator: string) => Concat
// tslint:disable-next-line: no-var-requires disable-next-line: variable-name
export const Concat: ConcatModule = require('fuse-concat-with-sourcemaps')

export function ensureUserPath(userPath: string) {
    if (!path.isAbsolute(userPath)) {
        userPath = path.join(userFuseDir, userPath)
    }
    userPath = path.normalize(userPath)
    const dir = path.dirname(userPath)

    fsExtra.ensureDirSync(dir)
    return userPath
}

export function isStylesheetExtension(str: string) {
    const ext = path.extname(str)
    return stylesheetExtensions.has(ext)
}

export function write(fileName: string, contents: any) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, contents, (e) => {
            if (e) {
                return reject(e)
            }
            return resolve()
        })
    })
}
