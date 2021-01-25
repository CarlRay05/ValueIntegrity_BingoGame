
        var bingoGameApp = angular.module('bingoGameApp', ['ngDialog']);

        bingoGameApp.controller('bingoGameController', function($scope, $timeout, ngDialog) {

            // variables
            $scope.currentQuestionIndex = 0;
            $scope.isGameOver = false;
            $scope.isEmailSubmitted = false;
            $scope.isSavingEmail = false;
            $scope.modalData = {
                userEmail: '',
                errorMessage: ''
            };
            
            $scope.answers = [
                {id: 1, label: 'R', isBoxBlocked: true}, {id: 2, label: 'A', isBoxBlocked: true}, {id: 3, label: 'I', isBoxBlocked: true}, {id: 4, label: 'S', isBoxBlocked: true}, {id: 5, label: 'E', isBoxBlocked: true},
                {id: 6, label: 'Success'}, {id: 7, label: 'Trust'}, {id: 8, label: 'RaiseIt'}, {id: 9, label: 'Acceptable'}, {id: 10, label: 'Positive'},
                {id: 11, label: 'Act', isPartOfWinningRow: true}, {id: 12, label: 'Honesty', isPartOfWinningRow: true}, {id: 13, label: 'Organization', isPartOfWinningRow: true}, {id: 14, label: 'Expected', isPartOfWinningRow: true}, {id: 15, label: 'Confident', isPartOfWinningRow: true},
                {id: 16, label: 'Aware'}, {id: 17, label: 'Ethical'}, {id: 18, label: 'IT', isBoxBlocked: true}, {id: 19, label: 'Committed'}, {id: 20, label: 'Free'},
                {id: 21, label: 'Mindful'}, {id: 22, label: 'Integrity'}, {id: 23, label: 'RaiseIT@dfamilk.com'}, {id: 24, label: 'Safety'}, {id: 25, label: 'Dignity'},
                {id: 26, label: 'Cooperative'}, {id: 27, label: 'Truth'}, {id: 28, label: 'Manangement'}, {id: 29, label: 'Fairly'}, {id: 30, label: 'Social Events'}];

            $scope.questions = [
                {text: 'Exercise good judgment and ____________ according to policies and applicable laws.',  answerId: 8},
                {text: 'Be ____________ that content you create can potentially be viewed by a wide audience, while it is actively posted, and may be available for viewing even after the content has been deleted.', answerId: 26},
                {text: 'Never speak on behalf of the Cooperative’s brands on ____________-produced content, industry-shared resources or online forums, groups and chat boards unless authorized to do so.', answerId: 14},
                {text: '____________ is our core value.', answerId: 24},
                {text: 'We have built an ____________ culture where our actions are consistent with our words, and our words are consistent with our intentions.', answerId: 20},
                {text: 'We ____________ our employees will do the right thing, and our management and leadership teams will do the right thing when employees raise concerns.', answerId: 21},
                {text: 'A supervisor or any member of ____________.', answerId: 15, inWinningRow: true},
                {text: 'The Ethics and Compliance Department at RaiseIt@dfamilk.com or 1-833-852-2020.', answerId: 12, inWinningRow: true},
                {text: "1-855-____________ (1-855-724-7348) or at www.dfamilk.ethicspoint.com, if employees wish to remain anonymous.", answerId: 25},
                {text: 'We never compromise our strong values, and we are ____________ to abiding by the laws designed to promote and preserve a competitive global market', answerId: 23},
                {text: 'Employees are our most important assets and their ____________ and health is of primary concern.', answerId: 11, inWinningRow: true},
                {text: 'Employees are ____________ to act in the best interest of the Cooperative at all times.', answerId: 11, inWinningRow: true},
                {text: 'All individuals should be treated with respect and ____________.', answerId: 11, inWinningRow: true},
                {text: 'We believe this begins with maintaining a ____________ and productive work environment, free from bullying, harassment and discrimination.', answerId: 11, inWinningRow: true},
                {text: 'We do not tolerate bullying, harassment, or discrimination in the workplace, or in any other work-related settings, such as business trips or business-related ____________ ____________.', answerId: 13, inWinningRow: true}];

            // functions
            $scope.init = function() {
                console.log('App started');
            };
            
            $scope.clickAnswer = function(answer){
                if ($scope.isGameOver ||
                    !answer ||
                    answer.isBoxBlocked)
                    return;

                if (answer.id != $scope.questions[$scope.currentQuestionIndex].answerId)
                    $scope.wrongAnswer();
                else 
                    $scope.correctAnswer(answer);
            };

            $scope.wrongAnswer = function () {
                ngDialog.open({
                    template: "wrongAnswerModalTemplate",
                    scope: $scope
                });
            };

            $scope.correctAnswer = function (answer) {
                answer.isCorrect = true;
                
                if ($scope.currentQuestionIndex != $scope.questions.length - 1)
                    $scope.currentQuestionIndex++;
                else
                    $scope.setGameOver();
            }

            $scope.setGameOver = function() {
                $scope.isGameOver = true;
                $scope.currentQuestionIndex++;
                $timeout($scope.showGameOver, 250);
            };

            $scope.showGameOver = function() {
                ngDialog.open({
                    template: "gameOverModalTemplate",
                    showClose: false,
                    closeByDocument: false,
                    closeByEscape: false,
                    scope: $scope
                });
            };

            $scope.closeModal = function() {
                ngDialog.closeAll();
            };

            $scope.submitEmail = function () {
                $scope.isEmailSubmitted = true;

                if (!$scope.modalData.userEmail ||
                    $scope.isSavingEmail)
                    return;

                $scope.isSavingEmail = true;
                $timeout($scope.showSaveSuccessful, 1000);
            };

            $scope.showSaveSuccessful = function() {
                $scope.isSavingEmail = false;
                $scope.closeModal();

                ngDialog.open({
                    template: "saveSuccessModalTemplate",
                    showClose: false,
                    closeByDocument: false,
                    closeByEscape: false,
                    scope: $scope
                });
            };

        });
