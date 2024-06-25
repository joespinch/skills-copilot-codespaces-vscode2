function skillsMember() {
    return {
        retrict: 'E',
        templateUrl: 'modules/skills/member.html',
        controller: 'SkillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }

    };
}