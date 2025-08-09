@Library('pipeline') _

def version = '25.4000'

if (prepare_run(version)) {
    node ('controls') {
        checkout_pipeline("rc-${version}")
        run_branch = load '/home/sbis/jenkins_pipeline/platforma/branch/run_branch'
        run_branch.execute('i18n', version)
    }
}